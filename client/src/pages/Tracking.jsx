import { useEffect, useMemo, useState } from "react";
import TrackingSearch from "../components/TrackingSearch";
import { api } from "../lib/api";
import { CircleCheck, CircleDot, MapPin } from "lucide-react";
import { io } from "socket.io-client";
import TrackingMap from "../components/TrackingMap";
import SupportChat from "../components/SupportChat";

const statusOrder = ["pending", "shipping", "warehouse", "delivering", "completed"];

export default function Tracking() {
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const socket = useMemo(() => {
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
    return io(url, { transports: ["websocket"] });
  }, []);

  useEffect(() => {
    socket.on("tracking:updated", (payload) => {
      if (payload?.tracking_code && payload.tracking_code === code) {
        fetchTracking(code);
      }
    });
    socket.on("vehicleLocation", (payload) => {
      const track = payload?.tracking_code || payload?.orderId;
      if (track && track === code) {
        setData((d) => {
          if (!d) return d;
          const next = {
            ...d,
            currentLocation: { lat: payload.lat, lng: payload.lng, timestamp: payload.timestamp },
            route: [...(d.route || []), { lat: payload.lat, lng: payload.lng, timestamp: payload.timestamp }]
          };
          return next;
        });
      }
    });
    return () => socket.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, code]);

  async function fetchTracking(nextCode) {
    const c = (nextCode || "").trim();
    if (!c) return;
    setCode(c);
    setError("");
    setLoading(true);
    try {
      socket.emit("subscribeTracking", c);
      const res = await api.get(`/api/tracking/${encodeURIComponent(c)}`);
      setData(res.data);
    } catch (err) {
      setData(null);
      setError(err?.response?.data?.message || "Không tìm thấy mã vận đơn.");
    } finally {
      setLoading(false);
    }
  }

  const currentIndex = data?.order?.status ? statusOrder.indexOf(data.order.status) : -1;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A66C2]/80">
          Tracking
        </div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Theo dõi đơn hàng</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Nhập mã vận đơn để xem trạng thái theo từng chặng và vị trí xe realtime trên bản đồ.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.35fr)]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft-lg">
            <TrackingSearch onSearch={fetchTracking} loading={loading} />
            <div className="mt-3 text-xs text-slate-500">
              Nhập mã vận đơn mà bạn được cung cấp khi tạo yêu cầu vận chuyển.
            </div>
            {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft-lg">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-slate-900">Timeline</div>
              <div className="text-xs text-slate-500">Cập nhật realtime</div>
            </div>

            {!data ? (
              <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                Chưa có dữ liệu. Vui lòng kiểm tra lại mã vận đơn được cung cấp hoặc liên hệ bộ phận hỗ trợ nếu bạn
                cần tra cứu giúp.
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-sm font-semibold text-slate-900">{data.order.tracking_code}</div>
                  <div className="mt-1 text-xs text-slate-600">
                    {data.order.origin} → {data.order.destination}
                  </div>
                </div>

                <ol className="space-y-3">
                  {data.timeline.map((t, idx) => {
                    const stepIndex = statusOrder.indexOf(t.status);
                    const active = stepIndex <= currentIndex;
                    return (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {active ? (
                            <CircleCheck className="text-[#0A66C2]" size={18} />
                          ) : (
                            <CircleDot className="text-slate-300" size={18} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-900">{t.label}</div>
                          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                            <span className="inline-flex items-center gap-1">
                              <MapPin size={12} /> {t.location}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span>{t.time}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <TrackingMap
            trackingCode={data?.order?.tracking_code}
            vehicle={data?.currentLocation}
            route={data?.route || []}
            height={520}
          />
          {code && (
            <SupportChat trackingCode={code} role="customer" />
          )}
        </div>
      </div>
    </div>
  );
}


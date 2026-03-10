import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { io } from "socket.io-client";
import { Plus, RefreshCw, Save, Navigation } from "lucide-react";
import SupportChat from "../components/SupportChat";

const statusOptions = ["pending", "shipping", "warehouse", "delivering", "completed"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loc, setLoc] = useState({ orderId: "", lat: "", lng: "" });
  const [form, setForm] = useState({
    tracking_code: "ZLL" + String(Math.floor(100000 + Math.random() * 899999)),
    customer_name: "",
    phone: "",
    origin: "",
    destination: "",
    status: "pending"
  });

  const socket = useMemo(() => {
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
    return io(url, { transports: ["websocket"] });
  }, []);

  useEffect(() => {
    socket.on("orders:updated", () => load());
    return () => socket.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  async function load() {
    setLoading(true);
    const { data } = await api.get("/api/orders");
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function onLocChange(e) {
    setLoc((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function create(e) {
    e.preventDefault();
    await api.post("/api/orders", form);
    setForm((f) => ({
      ...f,
      tracking_code: "ZLL" + String(Math.floor(100000 + Math.random() * 899999)),
      customer_name: "",
      phone: "",
      origin: "",
      destination: "",
      status: "pending"
    }));
    await load();
  }

  async function updateStatus(orderId, nextStatus) {
    await api.patch(`/api/orders/${orderId}/status`, { status: nextStatus });
    await load();
  }

  const activeOrder = useMemo(
    () => orders.find((o) => String(o.id) === String(loc.orderId)),
    [orders, loc.orderId]
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[#0A66C2]">Orders</div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Quản lý đơn hàng</h1>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <form onSubmit={create} className="mt-5 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Plus size={16} /> Tạo đơn hàng
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <Field label="Tracking code" name="tracking_code" value={form.tracking_code} onChange={onChange} />
          <Field label="Tên khách" name="customer_name" value={form.customer_name} onChange={onChange} required />
          <Field label="SĐT" name="phone" value={form.phone} onChange={onChange} required />
          <Field label="Origin" name="origin" value={form.origin} onChange={onChange} required />
          <Field label="Destination" name="destination" value={form.destination} onChange={onChange} required />
          <div>
            <label className="text-xs font-semibold text-slate-600">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={onChange}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0753a3]"
        >
          <Save size={16} />
          Create
        </button>
      </form>

      <div className="mt-5 overflow-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-600">
            <tr>
              <th className="px-4 py-3">Tracking</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-slate-200">
                <td className="px-4 py-3 font-semibold text-slate-900">{o.tracking_code}</td>
                <td className="px-4 py-3 text-slate-700">
                  {o.customer_name}
                  <div className="text-xs text-slate-500">{o.phone}</div>
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {o.origin} → {o.destination}
                </td>
                <td className="px-4 py-3">
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                    disabled={loading}
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-slate-600">{o.created_at}</td>
              </tr>
            ))}
            {!orders.length && (
              <tr>
                <td className="px-4 py-6 text-slate-600" colSpan={5}>
                  No orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <Navigation size={16} /> Cập nhật vị trí xe (realtime)
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <div>
            <label className="text-xs font-semibold text-slate-600">Order</label>
            <select
              name="orderId"
              value={loc.orderId}
              onChange={onLocChange}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option value="">Chọn đơn</option>
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.tracking_code}
                </option>
              ))}
            </select>
          </div>
          <Field label="Latitude" name="lat" value={loc.lat} onChange={onLocChange} />
          <Field label="Longitude" name="lng" value={loc.lng} onChange={onLocChange} />
          <div className="flex items-end">
            <button
              type="button"
              onClick={async () => {
                if (!loc.orderId || !loc.lat || !loc.lng) return;
                await api.post(`/api/orders/${loc.orderId}/location`, { lat: loc.lat, lng: loc.lng });
                setLoc((s) => ({ ...s, lat: "", lng: "" }));
              }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0753a3] disabled:opacity-60"
              disabled={loading}
            >
              <Navigation size={16} />
              Update location
            </button>
          </div>
        </div>
        <div className="mt-2 text-xs text-slate-600">
          Gợi ý demo: HCM (10.8231, 106.6297) • HN (21.0285, 105.8048)
        </div>
      </div>

      {activeOrder && (
        <div className="mt-5">
          <SupportChat trackingCode={activeOrder.tracking_code} role="agent" />
        </div>
      )}
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-600">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
      />
    </div>
  );
}


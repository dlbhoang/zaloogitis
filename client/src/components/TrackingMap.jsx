import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";

function truckDivIcon() {
  const svg = `
  <svg width="34" height="34" viewBox="0 0 34 34" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0A66C2"/>
        <stop offset="1" stop-color="#1D74D0"/>
      </linearGradient>
    </defs>
    <circle cx="17" cy="17" r="15" fill="url(#g)" stroke="white" stroke-width="3"/>
    <path d="M10 18v-5h10v5h2.2l1.8 2.3V23h-2a2.5 2.5 0 0 1-5 0h-6a2.5 2.5 0 0 1-5 0H6v-5h4zm1-4v4h8v-4h-8zm11.3 5H20v2h3.6l-1.3-2z"
      fill="white" opacity="0.95"/>
  </svg>`;
  return L.divIcon({
    className: "zl-truck-marker",
    html: svg,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
}

function useSmoothLatLng(target, enabled = true) {
  const [pos, setPos] = useState(target);

  useEffect(() => {
    if (!enabled) {
      setPos(target);
      return;
    }
    if (!target) return;
    const start = pos || target;
    const end = target;
    const startT = performance.now();
    const dur = 650;

    let raf = 0;
    const tick = (t) => {
      const k = Math.min(1, (t - startT) / dur);
      const ease = 1 - Math.pow(1 - k, 3);
      setPos({
        lat: start.lat + (end.lat - start.lat) * ease,
        lng: start.lng + (end.lng - start.lng) * ease
      });
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.lat, target?.lng]);

  return pos;
}

export default function TrackingMap({ trackingCode, vehicle, route = [], height = 360 }) {
  const truckIcon = useMemo(() => truckDivIcon(), []);
  const smoothVehicle = useSmoothLatLng(vehicle, true);

  const center = useMemo(() => {
    if (smoothVehicle) return smoothVehicle;
    if (route.length) return route[Math.max(0, route.length - 1)];
    return { lat: 10.8231, lng: 106.6297 }; // fallback (HCM)
  }, [smoothVehicle, route]);

  const line = useMemo(() => route.map((p) => [p.lat, p.lng]), [route]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft-lg">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="text-sm font-semibold text-slate-900">Bản đồ realtime</div>
        <div className="text-xs text-slate-500">{trackingCode ? `Mã: ${trackingCode}` : ""}</div>
      </div>
      <div style={{ height }} className="bg-slate-50">
        <MapContainer
          center={center}
          zoom={7}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {line.length >= 2 && (
            <Polyline positions={line} pathOptions={{ color: "#0A66C2", weight: 4, opacity: 0.65 }} />
          )}

          {smoothVehicle && (
            <Marker position={[smoothVehicle.lat, smoothVehicle.lng]} icon={truckIcon}>
              <Popup>
                <div className="text-sm font-semibold">Xe đang vận chuyển</div>
                <div className="mt-1 text-xs">Mã đơn: {trackingCode}</div>
                <div className="mt-1 text-xs">
                  Vị trí: {smoothVehicle.lat.toFixed(5)}, {smoothVehicle.lng.toFixed(5)}
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}


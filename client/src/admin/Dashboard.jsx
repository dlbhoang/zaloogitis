import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { Package, FileText, DollarSign } from "lucide-react";

function sumRevenue(orders) {
  // demo: count completed * 1000000
  const completed = orders.filter((o) => o.status === "completed").length;
  return completed * 1000000;
}

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    (async () => {
      const [o, q] = await Promise.all([api.get("/api/orders"), api.get("/api/quotes")]);
      setOrders(o.data);
      setQuotes(q.data);
    })();
  }, []);

  const revenue = useMemo(() => sumRevenue(orders), [orders]);

  return (
    <div>
      <div className="text-sm font-semibold text-[#0A66C2]">Dashboard</div>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">Tổng quan</h1>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Card icon={Package} label="Tổng đơn vận chuyển" value={orders.length} />
        <Card icon={FileText} label="Tổng yêu cầu báo giá" value={quotes.length} />
        <Card
          icon={DollarSign}
          label="Doanh thu (demo)"
          value={new Intl.NumberFormat("vi-VN").format(revenue) + "₫"}
        />
      </div>

      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
        <div className="text-sm font-semibold text-slate-900">Biểu đồ đơn hàng (demo)</div>
        <div className="mt-3 grid grid-cols-5 gap-2">
          {["pending", "shipping", "warehouse", "delivering", "completed"].map((s) => (
            <div key={s} className="rounded-xl bg-white p-3">
              <div className="text-xs text-slate-500">{s}</div>
              <div className="mt-1 text-lg font-bold text-slate-900">
                {orders.filter((o) => o.status === s).length}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="flex items-center gap-2 text-slate-700">
        <Icon size={16} />
        <div className="text-xs font-semibold">{label}</div>
      </div>
      <div className="mt-2 text-2xl font-extrabold text-slate-900">{value}</div>
    </div>
  );
}


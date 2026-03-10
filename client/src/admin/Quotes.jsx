import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { RefreshCw } from "lucide-react";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    const { data } = await api.get("/api/quotes");
    setQuotes(data);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function setStatus(id, status) {
    await api.patch(`/api/quotes/${id}`, { status });
    await load();
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-[#0A66C2]">Quotes</div>
          <h1 className="mt-2 text-2xl font-bold text-slate-900">Quản lý báo giá</h1>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="mt-5 overflow-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold text-slate-600">
            <tr>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Route</th>
              <th className="px-4 py-3">Cargo</th>
              <th className="px-4 py-3">Weight</th>
              <th className="px-4 py-3">Note</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr key={q.id} className="border-t border-slate-200">
                <td className="px-4 py-3 text-slate-700">
                  <div className="font-semibold text-slate-900">{q.name}</div>
                  <div className="text-xs text-slate-500">{q.phone}</div>
                  <div className="text-xs text-slate-500">{q.email}</div>
                </td>
                <td className="px-4 py-3 text-slate-700">
                  {q.pickup} → {q.destination}
                </td>
                <td className="px-4 py-3 text-slate-700">{q.cargo}</td>
                <td className="px-4 py-3 text-slate-700">{q.weight} kg</td>
                <td className="px-4 py-3 text-slate-700">{q.note || "-"}</td>
                <td className="px-4 py-3">
                  <select
                    value={q.status}
                    onChange={(e) => setStatus(q.id, e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
                    disabled={loading}
                  >
                    {["new", "reviewing", "quoted", "closed"].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {!quotes.length && (
              <tr>
                <td className="px-4 py-6 text-slate-600" colSpan={6}>
                  No quotes.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


import { useState } from "react";
import { Search } from "lucide-react";

export default function TrackingSearch({ onSearch, loading }) {
  const [code, setCode] = useState("");

  return (
    <div>
      <div className="text-sm font-semibold text-slate-900">Tra cứu vận đơn</div>
      <div className="mt-3 flex gap-2">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Nhập mã vận đơn (ví dụ ZLL123456)"
          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary"
        />
        <button
          onClick={() => onSearch(code.trim())}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0753a3] active:scale-[0.98] transition disabled:opacity-60"
        >
          <Search size={16} />
          Search
        </button>
      </div>
    </div>
  );
}


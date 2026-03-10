import { useState } from "react";
import { api } from "../lib/api";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    pickup: "",
    destination: "",
    cargo: "",
    weight: "",
    note: ""
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setDone(false);
    setLoading(true);
    try {
      await api.post("/api/quotes", { ...form, weight: Number(form.weight) });
      setDone(true);
      setForm({
        name: "",
        phone: "",
        email: "",
        pickup: "",
        destination: "",
        cargo: "",
        weight: "",
        note: ""
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Gửi yêu cầu thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Họ tên" name="name" value={form.name} onChange={onChange} required />
        <Field label="Số điện thoại" name="phone" value={form.phone} onChange={onChange} required />
        <Field label="Email" name="email" value={form.email} onChange={onChange} required />
        <Field label="Loại hàng" name="cargo" value={form.cargo} onChange={onChange} required />
        <Field label="Điểm gửi" name="pickup" value={form.pickup} onChange={onChange} required />
        <Field
          label="Điểm nhận"
          name="destination"
          value={form.destination}
          onChange={onChange}
          required
        />
        <Field
          label="Khối lượng (kg)"
          name="weight"
          value={form.weight}
          onChange={onChange}
          required
          inputMode="decimal"
        />
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-slate-700">Ghi chú</label>
          <textarea
            name="note"
            value={form.note}
            onChange={onChange}
            rows={4}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
      {done && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 text-sm text-green-700">
          <CheckCircle2 size={16} />
          Đã gửi yêu cầu báo giá. ZaloLogistic sẽ liên hệ sớm.
        </div>
      )}

      <div className="mt-5 flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0753a3] disabled:opacity-60"
        >
          {loading && <Loader2 className="animate-spin" size={16} />}
          Gửi yêu cầu
        </button>
        <div className="text-xs text-slate-500">
          Bằng cách gửi, bạn đồng ý để ZaloLogistic liên hệ tư vấn.
        </div>
      </div>
    </form>
  );
}

function Field({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        {...props}
        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}


import QuoteForm from "../components/QuoteForm";

export default function Quote() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="text-sm font-semibold text-[#0A66C2]">Quote</div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Báo giá vận chuyển</h1>
          <p className="mt-3 text-slate-600">
            Điền thông tin bên dưới. Hệ thống sẽ lưu yêu cầu vào database để admin xử lý và phản hồi.
          </p>
          <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-700">
            Gợi ý: cung cấp càng chi tiết càng tốt (điểm gửi/nhận, loại hàng, khối lượng, ghi chú).
          </div>
        </div>
        <QuoteForm />
      </div>
    </div>
  );
}


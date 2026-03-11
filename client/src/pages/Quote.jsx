import QuoteForm from "../components/QuoteForm";

export default function Quote() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)]">
        <div className="space-y-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A66C2]/80">
            Báo giá
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Yêu cầu báo giá vận chuyển</h1>
          <p className="text-sm leading-relaxed text-slate-600">
            Điền thông tin lô hàng và tuyến đường. Yêu cầu của bạn sẽ được bộ phận vận hành tiếp nhận và phản hồi trong
            thời gian sớm nhất qua kênh liên hệ bạn cung cấp.
          </p>

          <div className="grid gap-3 text-sm md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Gợi ý thông tin nên cung cấp
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-slate-600">
                <li>Điểm lấy hàng và điểm giao hàng</li>
                <li>Loại hàng, khối lượng, số kiện</li>
                <li>Thời gian mong muốn lấy/giao</li>
                <li>Các yêu cầu đặc biệt (nếu có)</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600">
              Sau khi nhận thông tin, ZaloLogistic sẽ tư vấn lộ trình và chi phí phù hợp, đồng thời thống nhất phương án
              vận chuyển trước khi triển khai thực tế.
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft-lg">
          <QuoteForm />
        </div>
      </div>
    </div>
  );
}


const items = [
  {
    title: "Vận chuyển Bắc Nam",
    desc: "Phù hợp với doanh nghiệp có luồng hàng thường xuyên giữa các tỉnh/thành từ Bắc vào Nam và ngược lại.",
  },
  {
    title: "Vận chuyển container",
    desc: "Áp dụng cho các lô hàng container, hỗ trợ sắp xếp lịch trình, bãi, giấy tờ và phối hợp với đối tác cảng/bãi.",
  },
  {
    title: "Vận chuyển hàng lẻ",
    desc: "Phù hợp cho shop online, đơn vị thương mại cần gửi nhiều đơn nhỏ lẻ, ghép tuyến để tối ưu chi phí.",
  },
  {
    title: "Kho bãi logistics",
    desc: "Dùng cho nhu cầu lưu kho, đóng gói, phân loại và trung chuyển hàng hóa trước khi phân phối đến điểm bán.",
  },
];

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A66C2]/80">
          Dịch vụ
        </div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Các nhóm dịch vụ của ZaloLogistic</h1>
        <p className="mt-3 text-sm text-slate-600">
          Các dịch vụ được thiết kế xoay quanh nhu cầu thực tế của doanh nghiệp: từ vận chuyển xuyên suốt Bắc Nam đến
          hàng lẻ, container và lưu kho.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map((i) => (
            <div
              key={i.title}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-5"
            >
              <div>
                <div className="text-sm font-semibold text-slate-900">{i.title}</div>
                <div className="mt-1 text-sm text-slate-600">{i.desc}</div>
              </div>
              <div className="mt-3 text-[11px] text-slate-500">
                Trao đổi với đội ngũ ZaloLogistic để được tư vấn tuyến, tần suất và chi phí phù hợp cho nhu cầu cụ thể.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


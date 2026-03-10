const items = [
  {
    title: "Vận chuyển Bắc Nam",
    desc: "Nhận hàng tận nơi, giao đúng hẹn, theo dõi trạng thái từng chặng."
  },
  {
    title: "Vận chuyển container",
    desc: "Tối ưu lịch trình, hỗ trợ giấy tờ và vận hành linh hoạt."
  },
  {
    title: "Vận chuyển hàng lẻ",
    desc: "Ghép tuyến thông minh, phù hợp SMEs và shop online."
  },
  {
    title: "Kho bãi logistics",
    desc: "Lưu kho, đóng gói, phân loại, hỗ trợ phân phối."
  }
];

export default function Services() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold text-[#0A66C2]">Services</div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Dịch vụ</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border border-slate-200 p-5">
              <div className="font-semibold text-slate-900">{i.title}</div>
              <div className="mt-1 text-sm text-slate-600">{i.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


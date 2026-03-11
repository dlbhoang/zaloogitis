export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A66C2]/80">
            Liên hệ
          </div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Thông tin liên hệ ZaloLogistic</h1>
          <p className="mt-4 text-sm text-slate-600">
            Vui lòng sử dụng các kênh liên hệ mà bạn đã trao đổi với đội ngũ ZaloLogistic (điện thoại, Zalo, email hoặc
            đầu mối phụ trách) để được hỗ trợ nhanh nhất về báo giá, vận hành và tracking đơn hàng.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Khi triển khai thực tế, bạn có thể hiển thị hotline, địa chỉ email và thông tin văn phòng tại đây để khách
            hàng tiện liên hệ.
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-secondary to-slate-900 p-8 text-white">
          <div className="text-sm font-semibold text-white/80">Hỗ trợ nhanh</div>
          <p className="mt-2 text-sm text-white/80">
            Bạn có thể dùng chatbot ở góc phải để hỏi nhanh về báo giá, tracking và dịch vụ khi truy cập hệ thống
            ZaloLogistic.
          </p>
        </div>
      </div>
    </div>
  );
}


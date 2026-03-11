export default function Blog() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A66C2]/80">
          Blog
        </div>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">Tin tức &amp; chia sẻ</h1>
        <p className="mt-3 text-sm text-slate-600">
          Kênh cập nhật thông tin liên quan đến vận hành, tuyến đường, chính sách và các kinh nghiệm liên quan đến
          việc sử dụng dịch vụ vận chuyển cho doanh nghiệp.
        </p>
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-600">
          Nội dung đang được cập nhật. Bạn có thể sử dụng trang này để đăng các bài viết giới thiệu tuyến mới, thông
          báo lịch chạy, hoặc chia sẻ case thực tế với khách hàng.
        </div>
      </div>
    </div>
  );
}


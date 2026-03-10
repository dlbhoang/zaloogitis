export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="text-sm font-semibold text-[#0A66C2]">About</div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Về ZaloLogistic</h1>
          <p className="mt-4 text-slate-600">
            ZaloLogistic là đối tác vận tải và logistics đồng hành cùng doanh nghiệp trên toàn quốc,
            tập trung vào độ tin cậy, minh bạch và tối ưu chi phí. Nền tảng số cho phép khách hàng
            theo dõi đơn theo thời gian thực, quản lý báo giá và làm việc trực tiếp với đội ngũ tư vấn.
          </p>
          <p className="mt-3 text-slate-600">
            Hồ sơ năng lực chi tiết (Profile ZA2021) trình bày rõ năng lực đội xe, mạng lưới kho bãi,
            quy trình vận hành và khách hàng tiêu biểu.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-900/95 p-6 text-white shadow-sm">
          <div className="text-sm font-semibold text-white/80">Company Profile</div>
          <h2 className="mt-2 text-xl font-bold">Profile ZA2021</h2>
          <p className="mt-3 text-sm text-white/80">
            Tài liệu giới thiệu năng lực ZaloLogistic: quy mô đội xe, tuyến chính, kho bãi và quy trình
            chất lượng. Bạn có thể tải về bản PDF để gửi cho đối tác hoặc lưu trữ nội bộ.
          </p>
          <a
            href="/Profile-ZA2021.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Xem / tải hồ sơ năng lực (PDF)
          </a>
          <p className="mt-2 text-[11px] text-white/60">
            (Sao chép file <code>Profile ZA2021.pdf</code> vào thư mục <code>client/public</code> và
            đổi tên thành <code>Profile-ZA2021.pdf</code> để đường dẫn này hoạt động.)
          </p>
        </div>
      </div>
    </div>
  );
}


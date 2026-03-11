import heroMain from "../../assets/z7606408512162_739ba3080084a445c441b729b50157b1.jpg";
import heroSide from "../../assets/z7606408557492_ed13bed56c60cb68002466a11d6b1769.jpg";
import heroWarehouse from "../../assets/z7606408489948_984813d8db60a58c5544b68a8efe4469.jpg";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* 70% hiện đại: tóm tắt ngắn gọn, số liệu, CTA */}
      <section className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.2fr)]">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-[#0A66C2]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A66C2]" />
            Về ZaloLogistic
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Đối tác vận chuyển cho doanh nghiệp trên toàn quốc
          </h1>
          <p className="text-sm leading-relaxed text-slate-600">
            ZaloLogistic kết hợp đội xe thực tế và nền tảng số, giúp doanh nghiệp quản lý vận chuyển
            minh bạch, tối ưu chi phí và theo dõi đơn hàng theo thời gian thực trên nhiều kênh, trong đó có Zalo.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
            <AboutStat label="Nhóm khách hàng chính" value="SME, phân phối, sản xuất" />
            <AboutStat label="Khu vực phục vụ" value="Toàn quốc" />
            <AboutStat label="Giá trị cốt lõi" value="Tin cậy &amp; minh bạch" />
            <AboutStat label="Thời gian hỗ trợ" value="Trong giờ &amp; ngoài giờ" />
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/Profile-ZA2021.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(10,102,194,0.25)] hover:bg-[#0753a3] active:scale-[0.98] transition"
            >
              Xem hồ sơ năng lực (PDF)
            </a>
            <a
              href="tel:+84"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              Trao đổi nhanh với đội tư vấn
            </a>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="relative col-span-2 overflow-hidden rounded-3xl border border-slate-200 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <img
              src={heroMain}
              alt="Đội xe ZaloLogistic trong khu vực kho bãi"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
              Hình ảnh thực tế đội xe ZaloLogistic
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img
                src={heroSide}
                alt="Nhân sự ZaloLogistic đang làm việc với khách hàng"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <img
                src={heroWarehouse}
                alt="Kho bãi và quản lý hàng hóa của ZaloLogistic"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 30% cổ điển: quảng cáo, khoe khách hàng, company profile */}
      <section className="mt-12 grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1.1fr)]">
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A66C2]/80">
            Khách hàng &amp; đối tác
          </div>
          <h2 className="text-xl font-bold text-slate-900">Một số nhóm khách hàng tiêu biểu</h2>
          <p className="text-sm text-slate-600">
            ZaloLogistic đang phục vụ nhiều nhóm khách hàng khác nhau: shop online, nhà phân phối, đơn vị thương mại
            và một số doanh nghiệp sản xuất, với yêu cầu đa dạng về tuyến đường và thời gian giao hàng.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-3 text-xs text-slate-500">
            <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50 text-center px-2">
              Thương mại điện tử
            </div>
            <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50 text-center px-2">
              Phân phối &amp; đại lý
            </div>
            <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50 text-center px-2">
              Bán lẻ &amp; chuỗi cửa hàng
            </div>
            <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50 text-center px-2">
              Doanh nghiệp sản xuất
            </div>
            <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50 text-center px-2">
              Hàng tiêu dùng nhanh
            </div>
            <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50 text-center px-2">
              Các lĩnh vực khác
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <AboutQuote
              name="Đại diện một đơn vị phân phối khu vực miền Bắc"
              text="Hệ thống tracking rõ ràng và đội tư vấn chủ động giúp chúng tôi dễ cập nhật tình trạng đơn cho khách hàng, giảm nhiều cuộc gọi hỏi thăm hàng mỗi ngày."
            />
            <AboutQuote
              name="Chủ một thương hiệu thời trang online"
              text="Trong mùa cao điểm, việc theo dõi được lộ trình và tình trạng đơn theo chặng giúp shop yên tâm hơn khi giao hàng đến nhiều tỉnh thành."
            />
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-900/95 p-6 text-white shadow-[0_18px_45px_rgba(15,23,42,0.25)]">
          <div className="text-sm font-semibold text-white/80">Company Profile</div>
          <h2 className="mt-1 text-xl font-bold">Profile ZA2021</h2>
          <p className="mt-3 text-sm text-white/80">
            Hồ sơ năng lực ZaloLogistic trình bày đầy đủ về đội xe, tuyến chính, kho bãi, quy trình vận hành và khách
            hàng tiêu biểu. Tài liệu phù hợp để gửi cho đối tác, đấu thầu hoặc làm tư liệu nội bộ.
          </p>
          <ul className="mt-3 space-y-1 text-xs text-white/75">
            <li>- Thông tin đội xe và tải trọng</li>
            <li>- Mạng lưới kho bãi và tuyến trọng điểm</li>
            <li>- Quy trình xử lý đơn và chăm sóc khách hàng</li>
            <li>- Danh sách một số khách hàng đang hợp tác</li>
          </ul>
          <a
            href="/Profile-ZA2021.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            Xem / tải hồ sơ năng lực (PDF)
          </a>
          <p className="mt-2 text-[11px] text-white/60">
            (Sao chép file <code>Profile ZA2021.pdf</code> vào thư mục <code>client/public</code> và đổi tên thành{" "}
            <code>Profile-ZA2021.pdf</code> để đường dẫn này hoạt động.)
          </p>
        </div>
      </section>
    </div>
  );
}

function AboutStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className="mt-1 text-base font-extrabold text-slate-900">{value}</div>
    </div>
  );
}

function AboutQuote({ name, text }) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Chia sẻ từ khách hàng</div>
      <p className="mt-2 text-sm text-slate-800">“{text}”</p>
      <div className="mt-1 text-xs font-medium text-slate-500">{name}</div>
    </div>
  );
}


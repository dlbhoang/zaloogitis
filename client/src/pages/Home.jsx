import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Warehouse, Truck, Container, Boxes, ShieldCheck, Timer, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";
import heroOperations from "../../assets/z7606408509406_8a70462993e5f69dc4017b9a4ec0fba4.jpg";
import heroAdvisor from "../../assets/z7606408556868_fb8953a4b4e5381ee76d45cdbb106c13.jpg";
import heroWarehouse from "../../assets/z7606408489948_984813d8db60a58c5544b68a8efe4469.jpg";
import heroOffice from "../../assets/z7606408512162_739ba3080084a445c441b729b50157b1.jpg";

const services = [
  {
    icon: Truck,
    title: "Vận chuyển Bắc Nam",
    desc: "Tuyến Bắc Nam chạy mỗi ngày, giao nhanh, theo dõi dễ dàng cho doanh nghiệp SME.",
  },
  {
    icon: Container,
    title: "Vận chuyển container",
    desc: "Giải pháp FCL/LCL tối ưu chi phí cho cả hàng lẻ và hàng nguyên container.",
  },
  {
    icon: Boxes,
    title: "Vận chuyển hàng lẻ",
    desc: "Ghép chuyến thông minh, tiết kiệm ngân sách mà vẫn đảm bảo thời gian giao.",
  },
  {
    icon: Warehouse,
    title: "Kho bãi logistics",
    desc: "Lưu kho, đóng gói, phân phối chuyên nghiệp với hơn 500+ doanh nghiệp tin dùng.",
  },
];

const reasons = [
  { title: "Giá cạnh tranh", desc: "Báo giá minh bạch, tối ưu tuyến và chi phí theo từng lô hàng." },
  { title: "Giao đúng hẹn", desc: "100% đơn giao đúng cam kết, hạn chế tối đa phát sinh và trễ hẹn." },
  { title: "Đội xe lớn", desc: "Đa dạng tải trọng, chủ động mùa cao điểm, không lo thiếu chuyến." },
  { title: "Hỗ trợ 24/7", desc: "CSKH phản hồi trung bình dưới 5 phút qua Zalo và hotline." },
];

const steps = [
  {
    icon: ShieldCheck,
    title: "Tạo yêu cầu",
    desc: "Điền form dưới 1 phút với thông tin lô hàng và tuyến đường.",
  },
  {
    icon: Timer,
    title: "Nhận báo giá",
    desc: "Nhận báo giá trong giờ làm việc, minh bạch và rõ chi phí.",
  },
  {
    icon: MapPinned,
    title: "Theo dõi realtime",
    desc: "Xem trạng thái từng chặng và vị trí xe trên bản đồ realtime.",
  },
];

const heroSlides = [
  {
    src: heroOperations,
    alt: "Đội xe và vận hành logistics của ZaloLogistic",
    label: "Hình ảnh thực tế đội xe ZaloLogistic",
  },
  {
    src: heroWarehouse,
    alt: "Kho bãi và khu vực trung chuyển hàng hóa",
    label: "Khu vực kho bãi và trung chuyển hàng",
  },
  {
    src: heroOffice,
    alt: "Nhân sự ZaloLogistic làm việc với khách hàng",
    label: "Đội ngũ ZaloLogistic trao đổi với khách hàng",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pb-10">
      <section className="bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A66C2]/80">
              Giải pháp vận chuyển cho doanh nghiệp SME
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl font-extrabold tracking-tight text-secondary md:text-5xl"
            >
              Vận chuyển toàn quốc, báo giá nhanh, tracking realtime
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              className="mt-4 text-base leading-relaxed text-slate-600"
            >
              Gửi yêu cầu trong vài phút, nhận báo giá nhanh, theo dõi đơn trên bản đồ và được hỗ trợ
              24/7 qua Zalo. Tất cả trạng thái đơn đều được cập nhật minh bạch theo từng chặng.
            </motion.p>
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.div whileHover={{ y: -2, scale: 1.02 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                <Link
                  to="/quote"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(10,102,194,0.25)] hover:bg-[#0753a3] active:scale-[0.98] transition"
                >
                  Nhận báo giá <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}>
                <Link
                  to="/tracking"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Tracking đơn
                </Link>
              </motion.div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 text-xs text-slate-600 md:grid-cols-4">
              <Stat label="Tuyến Bắc Nam" value="Chạy mỗi ngày" />
              <Stat label="Tracking" value="Realtime" />
              <Stat label="Đơn đúng hẹn" value="98%" />
              <Stat label="Hỗ trợ" value="< 5 phút" />
            </div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900">Tổng quan vận hành</div>
                  <p className="mt-1 text-sm text-slate-600">
                    Theo dõi trạng thái đơn, vị trí xe và hiệu suất giao hàng realtime.
                  </p>
                </div>
                <div className="hidden items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-[#0A66C2] md:flex">
                  <span className="h-6 w-6 overflow-hidden rounded-full bg-primary/10">
                    <img
                      src={heroAdvisor}
                      alt="Tư vấn viên ZaloLogistic đang hỗ trợ khách hàng"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </span>
                  Tư vấn 24/7
                </div>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <Kpi title="Đơn đang xử lý" value="128" />
                <Kpi title="Đang vận chuyển" value="42" />
                <Kpi title="Đúng hẹn" value="100%" />
                <Kpi title="CSKH phản hồi" value="< 5 phút" />
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                <div className="relative aspect-[16/10] w-full">
                  {heroSlides.map((slide, index) => (
                    <motion.img
                      key={slide.src}
                      src={slide.src}
                      alt={slide.alt}
                      loading="lazy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: index === activeSlide ? 1 : 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute left-0 top-0 h-full w-full object-cover"
                    />
                  ))}
                  <div className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                    {heroSlides[activeSlide].label}
                  </div>
                  <div className="absolute bottom-3 right-3 flex gap-1.5">
                    {heroSlides.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveSlide(index)}
                        className={`h-1.5 rounded-full transition ${
                          index === activeSlide ? "w-4 bg-white" : "w-1.5 bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-[#0A66C2]">
                <s.icon size={18} />
              </div>
              <div className="mt-3 font-semibold text-slate-900">{s.title}</div>
              <div className="mt-1 text-sm text-slate-600">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A66C2]/80">Services</div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Dịch vụ vận chuyển cho doanh nghiệp</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <motion.div
              key={s.title}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-primary-soft p-2 text-[#0A66C2]">
                  <s.icon size={18} />
                </div>
                <div>
                  <div className="font-semibold text-secondary">{s.title}</div>
                  <div className="mt-1 text-sm text-slate-600">{s.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A66C2]/80">
              Why Choose Us
            </div>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Vì sao hơn 500+ doanh nghiệp chọn ZaloLogistic</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]"
              >
                <div className="font-semibold text-slate-900">{r.title}</div>
                <div className="mt-1 text-sm text-slate-600">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.06)]">
            <div className="text-sm font-semibold text-slate-900">Khách hàng &amp; đánh giá</div>
            <p className="mt-2 text-sm text-slate-600">
              ZaloLogistic đang đồng hành cùng nhiều doanh nghiệp trong các lĩnh vực thương mại điện tử, phân phối và
              sản xuất.
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-slate-500">
              <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50">Logo Brand A</div>
              <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50">Logo Brand B</div>
              <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50">Logo Brand C</div>
              <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50">Logo Brand D</div>
              <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50">Logo Brand E</div>
              <div className="flex h-12 items-center justify-center rounded-xl bg-slate-50">Logo Brand F</div>
            </div>
            <div className="mt-4 space-y-4">
              <Testimonial
                name="Mai Anh – Chủ shop thời trang online"
                text="Tracking rõ ràng, giao hàng đúng hẹn, CSKH phản hồi rất nhanh ngay trên Zalo, mình không còn phải gọi nhiều nơi để hỏi hàng ở đâu."
              />
              <Testimonial
                name="Công ty ABC – Đơn vị phân phối"
                text="Báo giá tốt, quy trình chuyên nghiệp, cập nhật trạng thái liên tục giúp đội vận hành chủ động hơn rất nhiều trong mùa cao điểm."
              />
            </div>
          </div>
          <div className="rounded-2xl bg-[#0A66C2] p-7 text-white shadow-[0_18px_45px_rgba(10,102,194,0.25)]">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Start now</div>
            <div className="mt-2 text-2xl font-bold">Nhận báo giá trong vài phút</div>
            <p className="mt-2 text-sm text-white/90">
              Gửi yêu cầu vận chuyển ngay hôm nay, đội ngũ ZaloLogistic sẽ tư vấn lộ trình và chi phí phù hợp nhất với
              tuyến vận chuyển của bạn.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 active:scale-[0.98] transition"
              >
                Tạo yêu cầu báo giá <ArrowRight size={16} />
              </Link>
              <Link
                to="/tracking"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 active:scale-[0.98] transition"
              >
                Tracking đơn hiện tại
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_18px_45px_rgba(15,23,42,0.04)]">
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function Testimonial({ name, text }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="text-sm font-semibold text-slate-900">{name}</div>
      <div className="mt-1 text-sm text-slate-600">{text}</div>
    </div>
  );
}

function Kpi({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="mt-1 text-lg font-extrabold text-slate-900">{value}</div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-gradient-to-r from-[#0A66C2] to-primary-soft" />
    </div>
  );
}


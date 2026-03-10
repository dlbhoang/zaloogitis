import { motion } from "framer-motion";
import { ArrowRight, Warehouse, Truck, Container, Boxes, ShieldCheck, Timer, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  { icon: Truck, title: "Vận chuyển Bắc Nam", desc: "Linh hoạt tuyến, giao nhanh, theo dõi dễ dàng." },
  { icon: Container, title: "Vận chuyển container", desc: "Giải pháp FCL/LCL tối ưu chi phí." },
  { icon: Boxes, title: "Vận chuyển hàng lẻ", desc: "Ghép chuyến thông minh, tiết kiệm ngân sách." },
  { icon: Warehouse, title: "Kho bãi logistics", desc: "Lưu kho, đóng gói, phân phối chuyên nghiệp." }
];

const reasons = [
  { title: "Giá cạnh tranh", desc: "Báo giá minh bạch, tối ưu theo nhu cầu." },
  { title: "Giao nhanh", desc: "Quy trình chuẩn hóa, theo dõi realtime." },
  { title: "Đội xe lớn", desc: "Đa dạng tải trọng, đáp ứng cao điểm." },
  { title: "Hỗ trợ 24/7", desc: "CSKH sẵn sàng, xử lý nhanh." }
];

const steps = [
  { icon: ShieldCheck, title: "Tạo yêu cầu", desc: "Nhập thông tin lô hàng và tuyến đường để nhận tư vấn." },
  { icon: Timer, title: "Nhận báo giá", desc: "Báo giá nhanh, minh bạch. Xác nhận lịch lấy hàng." },
  { icon: MapPinned, title: "Theo dõi realtime", desc: "Tracking theo chặng và bản đồ vị trí xe theo thời gian thực." }
];

export default function Home() {
  return (
    <div className="pb-10">
      <section className="bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A66C2]/80">
              Logistics &amp; Transportation
            </p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-3xl font-extrabold tracking-tight text-secondary md:text-5xl"
            >
              ZaloLogistic – Giải pháp vận chuyển toàn quốc
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
              className="mt-4 text-base leading-relaxed text-slate-600"
            >
              Từ báo giá đến tracking đơn hàng và hỗ trợ 24/7. Quản lý đơn minh bạch, cập nhật trạng
              thái rõ ràng theo từng chặng.
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
              <Stat label="Tuyến Bắc Nam" value="Daily" />
              <Stat label="Tracking" value="Realtime" />
              <Stat label="Đội xe" value="Đa dạng" />
              <Stat label="Hỗ trợ" value="24/7" />
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
                  <p className="mt-1 text-sm text-slate-600">Theo dõi trạng thái đơn và vị trí xe realtime.</p>
                </div>
                <div className="hidden items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-[#0A66C2] md:flex">
                  <span className="h-6 w-6 overflow-hidden rounded-full bg-primary/10">
                    <img
                      src="https://images.pexels.com/photos/4484078/pexels-photo-4484078.jpeg?auto=compress&cs=tinysrgb&w=80"
                      alt="Tư vấn viên ZaloLogistic"
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
                <Kpi title="Đúng hẹn" value="98.2%" />
                <Kpi title="CSKH phản hồi" value="< 5 phút" />
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
                <img
                  src="https://images.pexels.com/photos/4484077/pexels-photo-4484077.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Đội xe và vận hành logistics"
                  className="aspect-[16/10] w-full object-cover"
                  loading="lazy"
                />
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
          <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Dịch vụ vận chuyển</h2>
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
            <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">Vì sao chọn ZaloLogistic</h2>
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
            <div className="text-sm font-semibold text-slate-900">Testimonials</div>
            <div className="mt-4 space-y-4">
              <Testimonial name="Mai Anh" text="Tracking rõ ràng, giao hàng đúng hẹn, CSKH phản hồi nhanh." />
              <Testimonial name="Công ty ABC" text="Báo giá tốt, quy trình chuyên nghiệp, cập nhật trạng thái liên tục." />
            </div>
          </div>
            <div className="rounded-2xl bg-[#0A66C2] p-7 text-white shadow-[0_18px_45px_rgba(10,102,194,0.25)]">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/90">Start now</div>
            <div className="mt-2 text-2xl font-bold">Nhận báo giá trong vài phút</div>
            <p className="mt-2 text-sm text-white/90">
              Điền form để nhận tư vấn và báo giá tối ưu theo tuyến vận chuyển.
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
                Tracking realtime
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


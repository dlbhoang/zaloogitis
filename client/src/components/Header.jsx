import { NavLink, Link } from "react-router-dom";
import { PackageSearch, MessageCircle, FileText, Shield } from "lucide-react";
import logo from "../../assets/logo.jpg";

const nav = [
  { to: "/", label: "Trang chủ" },
  { to: "/about", label: "Về chúng tôi" },
  { to: "/services", label: "Dịch vụ" },
  { to: "/quote", label: "Báo giá" },
  { to: "/tracking", label: "Tracking" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Liên hệ" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3 font-semibold text-slate-900">
          <span className="inline-flex h-9 w-9 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <img src={logo} alt="Logo ZaloLogistic" className="h-full w-full object-cover" loading="lazy" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm tracking-tight">ZaloLogistic</span>
            <span className="text-[10px] font-normal uppercase tracking-[0.16em] text-slate-500">
              Logistics &amp; Transportation
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-[#0A66C2] underline underline-offset-4"
                    : "text-slate-600 hover:text-slate-900"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/tracking"
            className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 md:inline-flex"
          >
            <PackageSearch size={16} />
            Track
          </Link>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-[#0A66C2] px-4 py-2 text-sm font-semibold text-white shadow-soft-lg hover:bg-[#0753a3] active:scale-[0.98] transition"
          >
            <FileText size={16} />
            Get Quote
          </Link>
         
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-slate-200 px-4 py-2 md:hidden">
        <div className="flex flex-wrap gap-3">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-1 text-sm ${
                  isActive ? "bg-blue-50 text-[#0A66C2]" : "bg-slate-50 text-slate-700"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-sm text-slate-700">
            <MessageCircle size={14} /> Chatbot
          </span>
        </div>
      </div>
    </header>
  );
}


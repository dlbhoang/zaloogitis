import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, FileText, Users, LineChart, LogOut } from "lucide-react";
import { clearAuth, getUser } from "../lib/auth";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/orders", label: "Orders", icon: Package },
  { to: "/admin/quotes", label: "Quotes", icon: FileText },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/analytics", label: "Analytics", icon: LineChart }
];

export default function AdminLayout() {
  const user = getUser();
  const navigate = useNavigate();

  function logout() {
    clearAuth();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-full bg-slate-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-sm font-semibold text-slate-900">Admin</div>
          <div className="mt-1 text-xs text-slate-600">{user?.email}</div>

          <nav className="mt-4 space-y-1">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-blue-50 text-[#0A66C2]" : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                <n.icon size={16} />
                {n.label}
              </NavLink>
            ))}
          </nav>

          <button
            onClick={logout}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </aside>

        <main className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
}


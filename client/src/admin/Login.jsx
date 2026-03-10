import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { setAuth } from "../lib/auth";
import { Loader2, Shield } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@zalologistic.vn");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const loc = useLocation();

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/login", { email, password });
      setAuth(data.token, data.user);
      const to = loc.state?.from || "/admin";
      navigate(to, { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 text-slate-900">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0A66C2] text-white">
            <Shield size={18} />
          </span>
          <div>
            <div className="text-sm font-semibold">ZaloLogistic</div>
            <div className="text-xs text-slate-600">Admin Login</div>
          </div>
        </div>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A66C2] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0753a3] disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin" size={16} />}
            Login
          </button>
          <div className="text-center text-xs text-slate-500">
            Demo: admin@zalologistic.vn / admin123
          </div>
        </form>
      </div>
    </div>
  );
}


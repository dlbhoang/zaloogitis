import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Quote from "./pages/Quote";
import Tracking from "./pages/Tracking";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import AdminLayout from "./admin/AdminLayout";
import AdminLogin from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import Orders from "./admin/Orders";
import Quotes from "./admin/Quotes";
import Users from "./admin/Users";
import Analytics from "./admin/Analytics";
import { RequireAdmin } from "./components/RequireAdmin";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="quotes" element={<Quotes />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

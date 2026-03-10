import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

export function Layout() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1 bg-slate-50">
        <Outlet />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}


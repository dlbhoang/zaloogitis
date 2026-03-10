import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../lib/api";

function useAutoScroll(deps) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Xin chào, mình là tư vấn viên ZaloLogistic. Bạn cần báo giá, tracking đơn hay tư vấn tuyến vận chuyển?"
    }
  ]);

  const history = useMemo(
    () => messages.filter((m) => m.role === "user" || m.role === "assistant"),
    [messages]
  );

  const listRef = useAutoScroll([open, messages.length, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const { data } = await api.post("/api/chat", { message: text, history });
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Xin lỗi, hiện chatbot đang bận. Bạn thử lại giúp mình nhé." }
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            className="mb-3 w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.18)]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 overflow-hidden rounded-full bg-slate-100">
                  <img
                    src="https://images.pexels.com/photos/8867435/pexels-photo-8867435.jpeg?auto=compress&cs=tinysrgb&w=80"
                    alt="Tư vấn viên ZaloLogistic"
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </span>
                <div>
                  <div className="text-sm font-semibold text-slate-900">Tư vấn ZaloLogistic</div>
                  <div className="text-[10px] text-slate-500">Online • 24/7</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-600 hover:bg-slate-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div ref={listRef} className="max-h-[360px] space-y-3 overflow-auto p-4">
              {messages.map((m, idx) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={idx}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[85%]">
                      <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        {isUser ? "Khách hàng" : "Tư vấn viên"}
                      </div>
                      <div
                        className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                          isUser
                            ? "bg-[#0A66C2] text-white shadow-sm"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  </div>
                );
              })}
              {loading && (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 px-3 py-2 text-sm text-slate-700">
                    <Loader2 className="animate-spin" size={16} />
                    Đang trả lời...
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2 border-t border-slate-200 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Nhập câu hỏi..."
                className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                onClick={send}
                className="inline-flex items-center justify-center rounded-xl bg-[#0A66C2] px-3 py-2 text-white hover:bg-[#0753a3] disabled:opacity-60"
                disabled={loading}
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full bg-[#0A66C2] px-3 py-2 text-white shadow-[0_18px_45px_rgba(10,102,194,0.35)] hover:bg-[#0753a3] active:scale-[0.98] transition"
        aria-label="Chat với tư vấn viên"
      >
        <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/10">
          <img
            src="https://images.pexels.com/photos/8867435/pexels-photo-8867435.jpeg?auto=compress&cs=tinysrgb&w=80"
            alt="Tư vấn viên ZaloLogistic"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute -bottom-0.5 -right-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-[9px] font-bold">
            <MessageCircle size={10} />
          </span>
        </span>
        <span className="hidden text-xs font-semibold md:inline">
          Chat với tư vấn viên
        </span>
      </button>
    </div>
  );
}


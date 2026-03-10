import { useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { api } from "../lib/api";
import { Loader2, Send } from "lucide-react";

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

export default function SupportChat({ trackingCode, role }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const socket = useMemo(() => {
    const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
    return io(url, { transports: ["websocket"] });
  }, []);

  const listRef = useAutoScroll([messages.length]);

  useEffect(() => {
    if (!trackingCode) return;

    async function loadHistory() {
      try {
        const { data } = await api.get(`/api/support/${encodeURIComponent(trackingCode)}`);
        setMessages(data);
      } catch {
        // ignore
      }
    }

    loadHistory();
    socket.emit("support:subscribe", trackingCode);
    socket.on("support:message", (msg) => {
      if (!msg || msg.tracking_code !== trackingCode) return;
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("support:message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, trackingCode]);

  if (!trackingCode) return null;

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setLoading(true);
    try {
      setInput("");
      const path =
        role === "agent"
          ? `/api/support/${encodeURIComponent(trackingCode)}/agent`
          : `/api/support/${encodeURIComponent(trackingCode)}/customer`;
      const { data } = await api.post(path, { message: text });
      setMessages((prev) => [...prev, data]);
    } catch {
      // ignore for now
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft-lg">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Chat với tư vấn viên
        </div>
        <div className="text-xs text-slate-500">Mã đơn: {trackingCode}</div>
      </div>

      <div ref={listRef} className="mt-3 max-h-64 space-y-2 overflow-auto text-sm">
        {!messages.length && (
          <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-500">
            Bắt đầu cuộc trò chuyện với tư vấn viên ZaloLogistic.
          </div>
        )}
        {messages.map((m) => {
          const isSelf = role === "agent" ? m.sender === "agent" : m.sender === "customer";
          const label = m.sender === "agent" ? "Tư vấn viên" : "Khách hàng";
          return (
            <div
              key={m.id}
              className={`flex ${isSelf ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[80%]">
                <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  {label}
                </div>
                <div
                  className={`rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    isSelf
                      ? "bg-[#0A66C2] text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {m.message}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") send();
          }}
          placeholder="Nhập nội dung tin nhắn..."
          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#0A66C2]"
        />
        <button
          onClick={send}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-xl bg-[#0A66C2] px-3 py-2 text-white hover:bg-[#0753a3] disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
        </button>
      </div>
    </div>
  );
}


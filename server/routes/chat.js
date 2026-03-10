const express = require("express");
const { z } = require("zod");

const router = express.Router();

function localAnswer(message) {
  const text = String(message || "").toLowerCase();
  if (text.includes("tracking") || text.includes("vận đơn") || text.includes("mã")) {
    return "Bạn vui lòng nhập mã vận đơn (ví dụ ZLL123456) ở trang Tracking. Nếu bạn gửi mã ở đây, mình có thể hướng dẫn thêm.";
  }
  if (text.includes("báo giá") || text.includes("giá") || text.includes("quote")) {
    return "Để nhận báo giá nhanh, bạn vào trang Quote và điền: điểm gửi/nhận, loại hàng, khối lượng. Mình cũng có thể gợi ý thông tin cần chuẩn bị.";
  }
  if (text.includes("hotline") || text.includes("liên hệ") || text.includes("phone")) {
    return "Hotline ZaloLogistic: 1900 0000 (demo). Bạn có thể để lại SĐT, mình sẽ nhờ CSKH liên hệ.";
  }
  return "ZaloLogistic sẵn sàng hỗ trợ. Bạn cần báo giá, tracking đơn, hay tìm hiểu dịch vụ vận chuyển (Bắc Nam, container, hàng lẻ, kho bãi)?";
}

router.post("/", async (req, res) => {
  const schema = z.object({
    message: z.string().min(1),
    history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() })).optional()
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid payload" });

  const { message, history = [] } = parsed.data;

  if (!process.env.OPENAI_API_KEY) {
    return res.json({ reply: localAnswer(message), provider: "local" });
  }

  try {
    // openai v5
    const { OpenAI } = require("openai");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const system = `Bạn là tư vấn viên chăm sóc khách hàng của công ty logistics ZaloLogistic.
Bạn đang trò chuyện trực tiếp với khách qua cửa sổ chat trên website, hãy trả lời như người thật:
- Xưng hô thân thiện, chuyên nghiệp.
- Hỗ trợ khách hỏi giá vận chuyển, gợi ý thông tin cần cung cấp.
- Hướng dẫn khách tracking đơn (giải thích cách dùng trang Tracking, mã đơn ví dụ ZLL123456).
- Giới thiệu ngắn gọn các dịch vụ chính (Bắc Nam, container, hàng lẻ, kho bãi).
- Cung cấp hotline và kênh liên hệ khi cần.
Ưu tiên câu trả lời ngắn gọn, rõ ý, không liệt kê quá dài.`;

    const messages = [
      { role: "system", content: system },
      ...history.map((h) => ({ role: h.role, content: h.content })),
      { role: "user", content: message }
    ];

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      messages,
      temperature: 0.4
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || localAnswer(message);
    return res.json({ reply, provider: "openai" });
  } catch (e) {
    return res.json({ reply: localAnswer(message), provider: "fallback" });
  }
});

module.exports = router;


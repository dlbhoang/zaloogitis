export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-sm font-semibold text-[#0A66C2]">Contact</div>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Liên hệ</h1>
          <p className="mt-4 text-slate-600">
            Hotline: <span className="font-semibold">1900 0000</span> (demo)
            <br />
            Email: support@zalologistic.vn
          </p>
        </div>
        <div className="rounded-3xl bg-gradient-to-br from-secondary to-slate-900 p-8 text-white">
          <div className="text-sm font-semibold text-white/80">Hỗ trợ nhanh</div>
          <p className="mt-2 text-sm text-white/80">
            Bạn có thể dùng chatbot ở góc phải để hỏi về báo giá, tracking và dịch vụ.
          </p>
        </div>
      </div>
    </div>
  );
}


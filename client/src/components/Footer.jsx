export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-200">
      <div className="h-1 w-full bg-[#0A66C2]" />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="text-lg font-semibold text-white">ZaloLogistic</div>
          <p className="mt-2 text-sm text-slate-300">
            Giải pháp vận chuyển toàn quốc. Bắc Nam, container, hàng lẻ, kho bãi logistics.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Liên hệ</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            <li>Hotline: 1900 0000 (demo)</li>
            <li>Email: support@zalologistic.vn</li>
            <li>Giờ làm việc: 8:00 - 18:00</li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Cam kết</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            <li>Giá cạnh tranh</li>
            <li>Giao nhanh</li>
            <li>Đội xe lớn</li>
            <li>Hỗ trợ 24/7</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} ZaloLogistic. All rights reserved.
      </div>
    </footer>
  );
}


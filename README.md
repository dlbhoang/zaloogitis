# ZaloLogistic (React + Vite + Express + MySQL)

## 1) Database (MySQL)

- Create DB + tables + demo data:

```sql
source mysql/schema.sql;
```

Demo admin:
- Email: `admin@zalologistic.vn`
- Password: `admin123`

Demo tracking code: `ZLL123456`

## 2) Backend (server)

```bash
cd server
cp .env.example .env
npm install
node server.js
```

API runs at `http://localhost:4000`

## 3) Frontend (client)

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Web runs at `http://localhost:5173`

## Notes

- Chatbot: nếu set `OPENAI_API_KEY` trong `server/.env` thì sẽ gọi OpenAI; không có key thì dùng trả lời local.
- Admin: vào `/admin` (sẽ chuyển qua `/admin/login` nếu chưa đăng nhập).


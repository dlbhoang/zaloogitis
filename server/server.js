require("dotenv").config();

const http = require("http");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const quoteRoutes = require("./routes/quotes");
const orderRoutes = require("./routes/orders");
const trackingRoutes = require("./routes/tracking");
const chatRoutes = require("./routes/chat");
const supportRoutes = require("./routes/support");

const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow non-browser clients (curl/postman) with no Origin
      if (!origin) return cb(null, true);

      const allowList = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const isAllowed =
        allowList.includes(origin) ||
        /^http:\/\/localhost:\d+$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin);

      return isAllowed ? cb(null, true) : cb(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api", authRoutes); // POST /api/login
app.use("/api/quotes", quoteRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tracking", trackingRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/support", supportRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      const allowList = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      const isAllowed =
        allowList.includes(origin) ||
        /^http:\/\/localhost:\d+$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin);
      return isAllowed ? cb(null, true) : cb(new Error("Not allowed by CORS"));
    }
  }
});

app.set("io", io);

io.on("connection", (socket) => {
  socket.emit("hello", { ok: true });
  socket.on("subscribeTracking", (tracking_code) => {
    if (typeof tracking_code === "string" && tracking_code.length) {
      socket.join(`tracking:${tracking_code}`);
    }
  });
  socket.on("support:subscribe", (tracking_code) => {
    if (typeof tracking_code === "string" && tracking_code.length) {
      socket.join(`support:${tracking_code}`);
    }
  });
});

const port = Number(process.env.PORT || 4000);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`ZaloLogistic API listening on http://localhost:${port}`);
});


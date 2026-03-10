const express = require("express");
const { getPool } = require("../db");

const router = express.Router();

const STATUS_LABELS = {
  pending: "Đã nhận hàng",
  shipping: "Đang vận chuyển",
  warehouse: "Đã tới kho trung chuyển",
  delivering: "Đang giao hàng",
  completed: "Giao thành công"
};

router.get("/:code", async (req, res) => {
  const { code } = req.params;
  const pool = getPool();

  const [orders] = await pool.query(
    "SELECT * FROM Orders WHERE tracking_code = ? LIMIT 1",
    [code]
  );
  const order = orders[0];
  if (!order) return res.status(404).json({ message: "Not found" });

  const [history] = await pool.query(
    "SELECT status, location, time FROM TrackingHistory WHERE order_id = ? ORDER BY id ASC",
    [order.id]
  );

  const [locRows] = await pool.query(
    "SELECT latitude, longitude, timestamp FROM VehicleLocations WHERE order_id = ? ORDER BY timestamp ASC LIMIT 200",
    [order.id]
  );
  const currentLocation = locRows.length ? locRows[locRows.length - 1] : null;

  return res.json({
    order: {
      tracking_code: order.tracking_code,
      customer_name: order.customer_name,
      phone: order.phone,
      origin: order.origin,
      destination: order.destination,
      status: order.status
    },
    timeline: history.map((h) => ({
      status: h.status,
      label: STATUS_LABELS[h.status] || h.status,
      location: h.location,
      time: h.time
    })),
    currentLocation: currentLocation
      ? {
          lat: Number(currentLocation.latitude),
          lng: Number(currentLocation.longitude),
          timestamp: currentLocation.timestamp
        }
      : null,
    route: locRows.map((r) => ({
      lat: Number(r.latitude),
      lng: Number(r.longitude),
      timestamp: r.timestamp
    }))
  });
});

module.exports = router;


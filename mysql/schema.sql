-- ZaloLogistic MySQL schema
CREATE DATABASE IF NOT EXISTS zalologistic CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE zalologistic;

CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS Quotes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pickup VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  cargo VARCHAR(255) NOT NULL,
  weight DECIMAL(10,2) NOT NULL,
  note TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  reply_price DECIMAL(12,2) NULL,
  reply_note TEXT NULL
);

CREATE TABLE IF NOT EXISTS Orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tracking_code VARCHAR(50) NOT NULL UNIQUE,
  customer_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS TrackingHistory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  location VARCHAR(255) NOT NULL,
  time DATETIME NOT NULL,
  CONSTRAINT fk_tracking_order FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS VehicleLocations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  latitude DECIMAL(10,6) NOT NULL,
  longitude DECIMAL(10,6) NOT NULL,
  timestamp DATETIME NOT NULL,
  CONSTRAINT fk_vehicle_order FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE,
  INDEX idx_vehicle_order_time (order_id, timestamp)
);

CREATE TABLE IF NOT EXISTS SupportMessages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tracking_code VARCHAR(50) NOT NULL,
  sender ENUM('customer','agent') NOT NULL,
  message TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_support_tracking_created (tracking_code, created_at)
);

-- Demo admin user (password: admin123)
-- bcrypt hash generated for admin123 (cost 10)
INSERT INTO Users (name, email, password, role)
VALUES ('Admin', 'admin@zalologistic.vn', '$2b$10$zon8MzIGaB0kNOyaXqWEVeNo4HDe3Mdj3AU.oumZJfZaYu3dzDEem', 'admin')
ON DUPLICATE KEY UPDATE email=email;

-- Demo order for tracking example ZLL123456
INSERT INTO Orders (tracking_code, customer_name, phone, origin, destination, status, created_at)
VALUES ('ZLL123456', 'Nguyen Van A', '0900000000', 'Hà Nội', 'TP.HCM', 'shipping', NOW())
ON DUPLICATE KEY UPDATE tracking_code=tracking_code;

INSERT INTO TrackingHistory (order_id, status, location, time)
SELECT o.id, 'pending', 'Hà Nội', NOW()
FROM Orders o
WHERE o.tracking_code='ZLL123456'
  AND NOT EXISTS (
    SELECT 1
    FROM TrackingHistory th
    WHERE th.order_id = o.id AND th.status = 'pending' AND th.location = 'Hà Nội'
  );

-- Demo vehicle locations for ZLL123456 (HN -> HCM direction, sample points)
INSERT INTO VehicleLocations (order_id, latitude, longitude, timestamp)
SELECT o.id, 21.028511, 105.804817, NOW()
FROM Orders o
WHERE o.tracking_code='ZLL123456'
  AND NOT EXISTS (
    SELECT 1 FROM VehicleLocations vl
    WHERE vl.order_id = o.id
      AND vl.latitude = 21.028511
      AND vl.longitude = 105.804817
  );


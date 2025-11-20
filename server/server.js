import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bugRoutes from "./routes/bugRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

// ==========================
//     GLOBAL MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json());

// ==========================
//          ROUTES
// ==========================

// Root route (Render will show this)
app.get("/", (req, res) => {
  res.send("🔥 MERN Bug Tracker API is running successfully!");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Bug CRUD routes
app.use("/api/bugs", bugRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);

// Global error handler
app.use(errorHandler);

// ==========================
//     DATABASE CONNECT
// ==========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// ==========================
//       START SERVER
// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

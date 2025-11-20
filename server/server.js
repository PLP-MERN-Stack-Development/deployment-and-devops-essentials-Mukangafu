import express from "express"; 
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import bugRoutes from "./routes/bugRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";   // ✅ Admin routes enabled
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

// Public Auth (Register / Login)
app.use("/api/auth", authRoutes);

// Normal User Bug CRUD Operations
app.use("/api/bugs", bugRoutes);

// Admin-only API Routes
app.use("/api/admin", adminRoutes);   // ✅ REQUIRED

// Global Error Handler
app.use(errorHandler);

// ==========================
//     DATABASE CONNECT
// ==========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err));

// ==========================
//       START SERVER
// ==========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

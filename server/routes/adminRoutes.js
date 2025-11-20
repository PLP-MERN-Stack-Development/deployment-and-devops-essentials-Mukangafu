import express from "express";
import requireAdmin from "../middleware/requireAdmin.js";
import {
  getAllUsers,
  getAllBugsAdmin,
  deleteBugAdmin,
  adminStats
} from "../controllers/adminController.js";

const router = express.Router();

/* ================================
        ADMIN ROUTES
================================ */

// Get system stats
router.get("/stats", requireAdmin, adminStats);

// Get all users
router.get("/users", requireAdmin, getAllUsers);

// Get all bugs (all users)
router.get("/bugs", requireAdmin, getAllBugsAdmin);

// Delete ANY bug
router.delete("/bugs/:id", requireAdmin, deleteBugAdmin);

export default router;

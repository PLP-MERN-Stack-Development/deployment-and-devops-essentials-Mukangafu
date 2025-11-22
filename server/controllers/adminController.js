import User from "../models/User.js";
import Bug from "../models/Bug.js";

/* ================================
        ADMIN CONTROLLER
================================ */

export const adminStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalBugs = await Bug.countDocuments();
  const open = await Bug.countDocuments({ status: "open" });
  const progress = await Bug.countDocuments({ status: "in-progress" });
  const resolved = await Bug.countDocuments({ status: "resolved" });

  res.json({
    totalUsers,
    totalBugs,
    open,
    progress,
    resolved,
  });
};

// Get all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// Get ALL bugs from all users
export const getAllBugsAdmin = async (req, res) => {
  const bugs = await Bug.find()
    .populate("reportedBy assignedTo", "username email role");

  res.json(bugs);
};

// Delete any bug
export const deleteBugAdmin = async (req, res) => {
  await Bug.findByIdAndDelete(req.params.id);
  res.json({ message: "Bug removed by admin" });
};

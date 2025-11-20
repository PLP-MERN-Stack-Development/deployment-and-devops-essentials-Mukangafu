import express from "express";
import {
  createBug,
  getBugs,
  updateBug,
  deleteBug,
} from "../controllers/bugController.js";

const router = express.Router();

router.post("/", createBug);
router.get("/", getBugs);
router.put("/:id", updateBug);
router.delete("/:id", deleteBug);

export default router;

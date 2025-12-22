import express from "express";
import multer from "multer";
import { runAgent } from "../controllers/agent.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/run", protect, upload.array("files"), runAgent);

export default router;

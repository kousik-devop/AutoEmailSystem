import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { runCampaign } from "../controllers/campaign.controller.js";

import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaignStatus,
} from "../controllers/campaign.controller.js";

const router = express.Router();

// 🔐 Protect all campaign routes
router.use(protect);

router.post("/", createCampaign);
router.get("/", getCampaigns);
router.get("/:id", getCampaignById);
router.patch("/:id/status", updateCampaignStatus);
router.post("/:id/run", runCampaign);

export default router;

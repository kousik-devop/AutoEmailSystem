import Campaign from "../models/campaign.model.js";
import { runAIAgent } from "../services/pythonAgent.service.js";

/**
 * Create Campaign
 */
export const createCampaign = async (req, res) => {
  const { name, type, prompt, meta } = req.body;

  if (!name || !type || !prompt) {
    throw new Error("All fields are required");
  }

  const campaign = await Campaign.create({
    name,
    type,           // email | social | whatsapp
    prompt,
    meta: meta || {},   // 👈 store meta (brand, to_email, etc.)
    status: "draft",
    createdBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    campaign,
  });
};

/**
 * Get All Campaigns (User-wise)
 */
export const getCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({
    createdBy: req.user._id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: campaigns.length,
    campaigns,
  });
};

/**
 * Get Single Campaign
 */
export const getCampaignById = async (req, res) => {
  const campaign = await Campaign.findOne({
    _id: req.params.id,
    createdBy: req.user._id,
  });

  if (!campaign) {
    return res.status(404).json({
      success: false,
      message: "Campaign not found",
    });
  }

  res.status(200).json({
    success: true,
    campaign,
  });
};

/**
 * Update Campaign Status
 */
export const updateCampaignStatus = async (req, res) => {
  const { status } = req.body;

  const campaign = await Campaign.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user._id },
    { status },
    { new: true }
  );

  if (!campaign) {
    return res.status(404).json({
      success: false,
      message: "Campaign not found",
    });
  }

  res.status(200).json({
    success: true,
    campaign,
  });
};

/**
 * Run Campaign (Preview or Execute)
 */
export const runCampaign = async (req, res) => {
  try {
    const { execute = false, chat_id } = req.body;

    const campaign = await Campaign.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    // Merge meta safely
    const meta = {
      ...(campaign.meta || {}),
      ...(chat_id ? { chat_id } : {}),
    };

    // 🔴 HARD VALIDATION (STOP HERE)
    if (execute && campaign.type === "email") {
      if (!meta.to_email || meta.to_email.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Email campaign requires at least one to_email",
        });
      }
    }

    if (execute && campaign.type === "telegram") {
      if (!meta.chat_id) {
        return res.status(400).json({
          success: false,
          message: "Telegram campaign requires chat_id",
        });
      }
    }

    const aiResult = await runAIAgent({
      agent_type: campaign.type,
      prompt: campaign.prompt,
      execute,
      meta,
    });

    campaign.status = execute ? "completed" : "running";

    campaign.aiResult = aiResult;
    await campaign.save();

    res.json({ success: true, aiResult });

  } catch (error) {
    console.error("Run Campaign Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["email", "telegram", "social", "whatsapp", "crm", "followup"],
      required: true,
    },

    prompt: {
      type: String,
      required: true,
    },

    // 🔥 STORE ALL AGENT CONFIG HERE
    meta: {
      type: Object,
      default: {},
    },

    status: {
      type: String,
      enum: ["draft", "previewed", "running", "completed", "failed"],
      default: "draft",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    aiResult: {
      type: Object,
    },

    stats: {
      sent: { type: Number, default: 0 },
      delivered: { type: Number, default: 0 },
      opened: { type: Number, default: 0 },
      replied: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);

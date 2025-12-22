import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./config/database.js";
import corsOptions from "./config/cors.js";
import { errorHandler } from "./middleware/error.middleware.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import campaignRoutes from "./routes/campaign.routes.js";
import agentRoutes from "./routes/agent.routes.js";
// import emailRoutes from "./routes/email.routes.js";
// import socialRoutes from "./routes/social.routes.js";
// import whatsappRoutes from "./routes/whatsapp.routes.js";
// import crmRoutes from "./routes/crm.routes.js";

// Load env variables
dotenv.config();

// Initialize app
const app = express();

// --------------------
// Core Middlewares
// --------------------
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// --------------------
// Database Connection
// --------------------
connectDB();

// --------------------
// Health Check
// --------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Agent Platform API is running 🚀",
  });
});

// --------------------
// API Routes
// --------------------
app.use("/api/auth", authRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/agent", agentRoutes);
// app.use("/api/email", emailRoutes);
// app.use("/api/social", socialRoutes);
// app.use("/api/whatsapp", whatsappRoutes);
// app.use("/api/crm", crmRoutes);

// --------------------
// Error Handler (Always Last)
// --------------------
app.use(errorHandler);

export default app;

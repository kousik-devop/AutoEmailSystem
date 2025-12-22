import dotenv from "dotenv";
import app from "./src/app.js";

// Load environment variables
dotenv.config();

// Server Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`
🚀 AI Agent Platform Backend Started
📡 Mode: ${process.env.NODE_ENV}
🌍 Port: ${PORT}
  `);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  process.exit(1);
});

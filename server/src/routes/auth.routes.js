import express from "express";
import { register, login, getMe, logout } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// 🔐 Protected route
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

router.post("/refresh", protect, (req, res) => {
  // For simplicity, just re-issue the same token
  res.json({ success: true, access_token: req.token });
});
router.post("/logout", protect, (req, res) => {
  res.json({ success: true });
});

router.get("/me", protect, getMe);

router.post("/logout", protect, (req, res) => {
  res.json({ success: true });
});


export default router;

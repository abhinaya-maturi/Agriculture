const express = require("express");
const { register, login } = require("../controllers/authController");
const { protect, buyerOnly, farmerOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// 📄 User Registration
router.post("/register", async (req, res) => {
    try {
        const { role } = req.body;
        if (!role || !["farmer", "buyer"].includes(role.toLowerCase())) {
            return res.status(400).json({ error: "Invalid role. Choose either 'farmer' or 'buyer'." });
        }
        await register(req, res);
    } catch (error) {
        console.error("🚨 Error during registration:", error.message);
        res.status(500).json({ error: "Internal server error during registration." });
    }
});

// 🔑 User Login
router.post("/login", async (req, res) => {
    try {
        const { role } = req.body;
        if (!role || !["farmer", "buyer"].includes(role.toLowerCase())) {
            return res.status(400).json({ error: "Invalid role. Choose either 'farmer' or 'buyer'." });
        }
        await login(req, res);
    } catch (error) {
        console.error("🚨 Error during login:", error.message);
        res.status(500).json({ error: "Internal server error during login." });
    }
});

// 🔒 Protected Profile Route (for authenticated users)
router.get("/profile", protect, (req, res) => {
    res.status(200).json({ message: "✅ Protected profile route accessed!", user: req.user });
});

// 🎯 Role-Based Example Routes
router.get("/farmer/dashboard", protect, farmerOnly, (req, res) => {
    res.status(200).json({ message: "🚜 Farmer Dashboard Accessed!", user: req.user });
});

router.get("/buyer/dashboard", protect, buyerOnly, (req, res) => {
    res.status(200).json({ message: "🛒 Buyer Dashboard Accessed!", user: req.user });
});

module.exports = router;

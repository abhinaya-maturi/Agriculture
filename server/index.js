require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

// ✅ Middleware
app.use(express.json({ limit: "10mb" })); // Handle JSON payloads
app.use(cors({ origin: process.env.CLIENT_URL || "*" })); // CORS for frontend

// 🟢 Connect to MongoDB with Retry Logic
const connectWithRetry = async () => {
    try {
        await connectDB();
        console.log("✅ MongoDB Connected Successfully");
    } catch (err) {
        console.error("❌ MongoDB connection failed. Retrying in 5 seconds...");
        setTimeout(connectWithRetry, 5000);
    }
};
connectWithRetry();

// 📄 Routes
app.use("/api/auth", require("./routes/authRoutes")); // Authentication routes
app.use("/api/items", require("./routes/itemRoutes")); // Item routes

// 📸 Static Uploads Folder for Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🟡 Default Route for API Health Check
app.get("/", (req, res) => {
    res.status(200).json({ message: "🚀 Farmer Friendly Web App API is running!" });
});

// 🔴 404 Error Handling for Unknown Routes
app.use((req, res) => {
    res.status(404).json({ message: "❌ Route not found." });
});

// ⚠️ Global Error Handler
app.use((err, req, res, next) => {
    console.error("🚨 Server error:", err.message);
    res.status(500).json({ message: "❌ Internal server error.", error: err.message });
});

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🌐 Server running on port ${PORT}`));

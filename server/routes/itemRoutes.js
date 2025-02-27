const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { uploadItem, getItems } = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
    console.log("📁 'uploads' folder not found. Creating one...");
    fs.mkdirSync(uploadDir, { recursive: true });
} else {
    console.log("✅ 'uploads' folder exists.");
}

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            console.error("❌ Invalid file type.");
            cb(new Error("Only JPG, JPEG, and PNG files are allowed."));
        }
    },
});

// Upload item route (POST)
router.post(
    "/",
    protect,
    upload.single("image"),
    (req, res, next) => {
        if (!req.file) {
            console.error("⚠️ No file uploaded.");
            return res.status(400).json({ message: "Image upload failed. Please upload a valid image." });
        }
        next();
    },
    uploadItem
);

// Fetch items route (GET)
router.get("/", protect, getItems);

// Serve uploaded images statically (optional, but recommended)
router.use("/uploads", express.static(uploadDir));

module.exports = router;

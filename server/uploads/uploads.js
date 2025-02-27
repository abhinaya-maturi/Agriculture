const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const uploadPath = path.join(__dirname, "../uploads");

      // Ensure the uploads folder exists
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
        console.log("✅ Uploads folder created.");
      }

      cb(null, uploadPath);
    } catch (err) {
      console.error("🚨 Error creating uploads folder:", err);
      cb(err, null);
    }
  },

  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = upload;

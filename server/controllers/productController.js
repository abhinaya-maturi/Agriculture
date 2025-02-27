const fs = require("fs");
const path = require("path");
const Item = require("../models/Item");

// 📤 Upload Item Controller
const uploadItem = async (req, res) => {
    try {
        const { name, category, cost, quantity } = req.body;

        console.log("📥 Received data:", { name, category, cost, quantity });

        // Validate required fields
        if (!name || !category || cost === undefined || quantity === undefined) {
            console.error("⚠️ Missing required fields.");
            return res.status(400).json({ message: "All fields are required." });
        }

        // Ensure cost and quantity are valid numbers
        const parsedCost = parseFloat(cost);
        const parsedQuantity = parseFloat(quantity);

        if (isNaN(parsedCost) || isNaN(parsedQuantity)) {
            console.error("⚠️ Invalid number values for cost or quantity.");
            return res.status(400).json({ message: "Cost and quantity must be valid numbers." });
        }

        // Ensure image upload exists
        if (!req.file) {
            console.error("⚠️ No image uploaded.");
            return res.status(400).json({ message: "Image is required." });
        }

        // Construct image URL for frontend access
        const imageUrl = `/api/items/uploads/${req.file.filename}`;
        console.log(`🖼️ Image uploaded to: ${imageUrl}`);

        // Create new item
        const newItem = new Item({
            name,
            category,
            cost: parsedCost,
            quantity: parsedQuantity,
            image: imageUrl,
            uploadedBy: req.user.id, // Link item to logged-in user
        });

        // Save to database
        await newItem.save();
        console.log("✅ Item uploaded successfully:", newItem);

        res.status(201).json(newItem);
    } catch (err) {
        console.error("🚨 Error uploading item:", err);

        // Rollback: Delete uploaded file if database save fails
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
            console.log(`🗑️ Rolled back: Deleted uploaded file: ${req.file.path}`);
        }

        res.status(500).json({ message: "Failed to upload item." });
    }
};

// 📥 Fetch Items Controller (GET)
const getItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        // Fetch only items uploaded by the logged-in user with pagination
        const items = await Item.find({ uploadedBy: req.user.id })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        if (!items.length) {
            console.log("ℹ️ No items found for this user.");
            return res.status(200).json({ message: "No items uploaded yet." });
        }

        console.log(`✅ Found ${items.length} items for user ${req.user.id}`);
        res.status(200).json(items);
    } catch (error) {
        console.error("🚨 Error fetching items:", error);
        res.status(500).json({ message: "Failed to fetch items." });
    }
};

module.exports = { uploadItem, getItems };

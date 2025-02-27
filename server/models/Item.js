const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Item", itemSchema);

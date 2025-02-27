// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true },
//     password: String,
//     role: { type: String, enum: ["farmer", "buyer"] }
// });

// module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: [{ type: String, enum: ["farmer", "buyer"], required: true }] // Allow multiple roles
});

module.exports = mongoose.model("User", UserSchema);

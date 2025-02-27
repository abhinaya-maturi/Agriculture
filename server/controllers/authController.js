const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// User Registration
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const validRoles = ["farmer", "buyer"];

        // Validate role
        if (!role || !validRoles.includes(role.toLowerCase())) {
            return res.status(400).json({ error: "Invalid role selection. Choose 'farmer' or 'buyer'." });
        }

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            if (!user.roles.includes(role)) {
                user.roles.push(role);
                await user.save();
                return res.status(200).json({ message: `Role '${role}' added successfully!` });
            }
            return res.status(400).json({ error: `User already registered as a '${role}'.` });
        }

        // Hash password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ name, email, password: hashedPassword, roles: [role] });

        await user.save();
        res.status(201).json({ message: "✅ User registered successfully!", user });
    } catch (err) {
        console.error("🚨 Registration Error:", err.message);
        res.status(500).json({ error: "Server error. Please try again." });
    }
};

// User Login with JWT
const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const validRoles = ["farmer", "buyer"];

        // Validate role
        if (!role || !validRoles.includes(role.toLowerCase())) {
            return res.status(400).json({ error: "Invalid role. Choose 'farmer' or 'buyer'." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "User not found." });
        }

        // Check if user has the required role
        if (!user.roles.includes(role)) {
            return res.status(400).json({ error: `User does not have the '${role}' role.` });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password." });
        }

        // Generate JWT token
        
        const token = jwt.sign(
          { userId: user._id, role: user.roles },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );
        res.status(200).json({
            message: "✅ Login successful!",
            token,
            user: { id: user._id, name: user.name, email: user.email, roles: user.roles },
        });
    } catch (err) {
        console.error("🚨 Login Error:", err.message);
        res.status(500).json({ error: "Server error. Please try again." });
    }
};

module.exports = { register, login };

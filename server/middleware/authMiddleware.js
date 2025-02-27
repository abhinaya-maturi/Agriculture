const jwt = require("jsonwebtoken");

// General authentication middleware
const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.error("❌ No token provided.");
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error("❌ JWT verification failed:", err.message);
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        // Ensure userId and role are correctly extracted
        const { userId, role } = decoded;
        if (!userId || !role) {
            console.error("⚠️ Token missing user ID or role.");
            return res.status(400).json({ message: "Token is missing user ID or role" });
        }

        // Attach user info to request object
        req.user = { userId, role };
        console.log("✅ Authenticated User:", req.user);
        next();
    });
};

// Role-based access for buyers only
const buyerOnly = (req, res, next) => {
    if (req.user?.role !== "buyer") {
        console.error("🚫 Access denied: Buyer role required.");
        return res.status(403).json({ message: "Access restricted to buyers only" });
    }
    console.log("✅ Buyer access granted.");
    next();
};

// Role-based access for farmers only
const farmerOnly = (req, res, next) => {
    if (req.user?.role !== "farmer") {
        console.error("🚫 Access denied: Farmer role required.");
        return res.status(403).json({ message: "Access restricted to farmers only" });
    }
    console.log("✅ Farmer access granted.");
    next();
};

module.exports = { protect, buyerOnly, farmerOnly };

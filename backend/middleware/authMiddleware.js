import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const protect = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("decoded", decoded);
        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
};

export const adminOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden - Admin access required" });
    }
    next();
};

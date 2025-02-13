const jwt = require("jsonwebtoken");

module.exports = (roles) => (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ error: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Forbidden" });
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid Token" });
    }
};

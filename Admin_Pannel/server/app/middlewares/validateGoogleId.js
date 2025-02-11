const User = require("../models/User");

const validateGoogleId = async (req, res, next) => {
  let googleId = req.body.googleId || req.params.googleId || req.headers.authorization?.replace("Bearer ", "");

  console.log("🔍 Validating Google ID:", googleId);

  if (!googleId) {
    return res.status(400).json({ error: "Google ID is required." });
  }

  try {
    const user = await User.findOne({ googleId });

    if (!user) {
      return res.status(404).json({ error: "❌ User not found. Please sign in with Google." });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = validateGoogleId;

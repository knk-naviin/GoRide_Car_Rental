const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
require("dotenv").config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleSignIn = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Google token is required." });
    }

    // ✅ Verify Google Token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub: googleId, name, email } = ticket.getPayload();

    if (!googleId || !email || !name) {
      return res.status(400).json({ error: "Invalid Google token payload." });
    }

    console.log("✅ Google Token Verified:", { googleId, name, email });

    // ✅ Check if user exists, otherwise create a new user
    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ googleId, name, email });
      await user.save();
    }

    return res.status(200).json(user);

  } catch (error) {
    console.error("❌ Error in Google Sign-In:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};

module.exports = { googleSignIn };

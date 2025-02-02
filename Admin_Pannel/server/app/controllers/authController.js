const User = require('../models/User');
const { verifyGoogleToken } = require('../utils/auth');

// Google Sign-In
const googleSignIn = async (req, res) => {
  try {
    const { token } = req.body;
    const payload = await verifyGoogleToken(token);

    let user = await User.findOne({ googleId: payload.sub });
    if (!user) {
      user = new User({
        googleId: payload.sub,
        name: payload.name,
        email: payload.email,
      });
      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  googleSignIn,
};
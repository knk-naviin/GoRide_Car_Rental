const express = require('express');
const router = express.Router();
const passport = require('passport');
const { googleSignIn } = require('../controllers/authController');
require('dotenv').config();


router.get('/google', (req, res, next) => {
  console.log('Initiating Google OAuth flow...');
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));


router.post("/google-signin", googleSignIn);


// Google OAuth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    if (!req.user) {
      return res.redirect('https://localhost:3000/login'); // If auth fails, redirect to login page
    }

    // Redirect with user info in query params (or use JWT for better security)
    res.redirect(`http://localhost:3000/users?name=${req.user.name}&email=${req.user.email}`);
  }
);


// Logout


// router.post("/logout", (req, res) => {
//   res.clearCookie("token"); // If using cookies
//   res.status(200).json({ message: "Logout successful" });
// });

router.post("/logout", (req, res) => {
  res.clearCookie("token"); // If using cookies
  res.status(200).json({ message: "✅ Logged out successfully" });
});

module.exports = router;
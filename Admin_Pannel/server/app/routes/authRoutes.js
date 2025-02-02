const express = require('express');
const router = express.Router();
const passport = require('passport');

// Google OAuth Login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect or respond with user data
    res.redirect('/profile');
  }
);

// Logout
router.get('/logout', (req, res) => {

  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    console.log("Logged Out Successfully")
    res.status(200).redirect('/');
    
  });
});

module.exports = router;
import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google Auth start
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false,
  }),
  (req, res) => {
    const { token, user } = req.user as any;

    // Pass token AND user via query param (encoded)
    const userEncoded = encodeURIComponent(JSON.stringify(user));
    res.redirect(
      `https://subtle-lebkuchen-9a6199.netlify.app/auth-success?token=${token}&user=${userEncoded}`
    );
  }
);

export default router;

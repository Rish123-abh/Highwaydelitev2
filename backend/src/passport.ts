import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './models/user.model';
import jwt from 'jsonwebtoken';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;

        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email,
            dateOfBirth: new Date(), // Placeholder
          });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
          expiresIn: '1d',
        });

        return done(null, { user, token });
      } catch (err) {
        return done(err);
      }
    }
  )
);

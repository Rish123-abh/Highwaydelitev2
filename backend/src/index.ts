import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import noteRoutes from './routes/note.routes';
import passport from 'passport';
import './passport'
import googleAuthRoutes from './routes/google.routes'
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://your-frontend-deployment-url.com'],
    credentials: true, // if you're using cookies or auth headers
  })
);
app.use(express.json());
app.use(passport.initialize());

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/auth', googleAuthRoutes);
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI as string).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

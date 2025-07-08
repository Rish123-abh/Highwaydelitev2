import { Request, Response } from 'express';
import Otp from '../models/otp.model';
import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { sendOtpEmail } from '../utils/email';

export const requestOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await Otp.create({ email, code: otpCode, expiresAt });
    await sendOtpEmail(email, otpCode);

    res.status(200).json({ message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, code,remember } = req.body;
    const validuser=await User.findOne({email})
    if(!validuser){
      res.status(400).json({message:'User does not exist'});
      return;
      }
    const record = await Otp.findOne({ email, code }).lean();

   if (!record) {
  res.status(400).json({ message: 'Invalid OTP' });
  return;
}

if (!record.expiresAt || record.expiresAt < new Date()) {
  res.status(400).json({ message: 'OTP has expired' });
  return;
}


    await Otp.deleteMany({ email }); // Optional cleanup

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: remember ? '7d' : '1h', });

    res.status(200).json({ token, user });
  } catch (error: any) {
  res.status(500).json({
    message: 'OTP verification failed',
    error: error.message || String(error),
  });
}

};
export const requestOtpSignup = async (req: Request, res: Response):Promise<void> => {
  const { name, email, dateOfBirth } = req.body;

  if (!email || !name || !dateOfBirth) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
     res.status(400).json({ message: 'User already exists' });
     return;
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await Otp.deleteMany({ email });
  await Otp.create({
    email,
    name,
    dateOfBirth,
    code: otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  });

  await sendOtpEmail(email, otp);

  res.status(200).json({ message: 'OTP sent for signup' });
};
export const verifyOtpSignup = async (req: Request, res: Response):Promise<void> => {
  try {
    const { email, code, name,dateOfBirth } = req.body;

    const record = await Otp.findOne({ email, code });
    if (!record) {
      res.status(400).json({ message: 'Invalid OTP' });
      return;
    }

    if (!record.expiresAt || record.expiresAt < new Date()) {
       res.status(400).json({ message: 'OTP expired' });
       return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(400).json({ message: 'User already exists' });
       return;
    }

    const user = await User.create({
      email,
      name: name,
      dateOfBirth: dateOfBirth,
    });

    await Otp.deleteMany({ email });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn:  '1h',
    });

    res.status(200).json({ token, user });
  } catch (err: any) {
    res.status(500).json({ message: 'Signup OTP failed', error: err.message });
  }
};



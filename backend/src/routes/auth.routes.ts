import express from 'express';
import { requestOtp, verifyOtp ,requestOtpSignup, verifyOtpSignup} from '../controllers/otp.controller';

const router = express.Router();

router.post('/signup', requestOtpSignup);
router.post('/request-otp', requestOtp);
router.post('/verify-otp', verifyOtp);
router.post('/verify-otp-signup', verifyOtpSignup);

export default router;

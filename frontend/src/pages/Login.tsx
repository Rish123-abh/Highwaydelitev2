import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../Login.css';
import { toast } from 'react-toastify';
import bg from '../assets/right-column.png';
import logo from '../assets/top.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const navigate = useNavigate();

  const requestOtp = async () => {
  try {
    await toast.promise(
      axios.post('/auth/request-otp', { email }),
      {
        pending: 'Sending OTP...',
        success: 'OTP sent to your email!',
        error: {
          render({ data }: { data: any }) {
            return data?.response?.data?.message || 'Failed to send OTP';
          },
        },
      }
    );
    setOtpSent(true);
  } catch (err) {
    // Already handled by toast.promise
  }
};


  const verifyOtp = async () => {
  try {
    const res = await toast.promise(
      axios.post('/auth/verify-otp', {
        email,
        code: otp,
        remember: keepLoggedIn,
      }),
      {
        pending: 'Verifying OTP...',
        success: 'Login successful!',
        error: {
           render({ data }: { data: any }) {
            return data?.response?.data?.message || 'Login failed';
          },
        },
      }
    );

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    navigate('/dashboard');
  } catch (err) {
    // Already handled by toast.promise
  }
};


  return (
    <div className="login-container">
      <div className="login-box">
        {/* Left Side - Form */}
        <div className="login-form">
          <img src={logo} alt="Logo" />
          <h2 className="form-title">Sign in</h2>
          <p className="form-subtitle">Please login to continue to your account.</p>

          {/* Floating input for email */}
          <div className="floating-input">
            <input
              type="email"
              id="email"
              value={email}
              placeholder=" "
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={otpSent}
            />
            <label htmlFor="email">Email</label>
          </div>

          {/* Floating input for OTP */}
          {otpSent && (
            <div className="floating-input">
              <input
                type="tel"
                id="otp"
                value={otp}
                placeholder=" "
                maxLength={6}
                onChange={(e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setOtp(val);
    }
  }}
                pattern="[0-9]*"
                inputMode="numeric"
                required

              />
              <label htmlFor="otp">OTP</label>
              <div className="resend-link" onClick={requestOtp}>
                Resend OTP
              </div>
            </div>
          )}

          {/* Custom checkbox */}
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
            />
            <span className="checkmark"></span>
            Keep me logged in
          </label>

          {/* Action button */}
          {!otpSent ? (
            <button className="sign-in-btn" onClick={requestOtp}>
              Send OTP
            </button>
          ) : (
            <button className="sign-in-btn" onClick={verifyOtp}>
              Sign in
            </button>
          )}

          <div className="or-divider">OR</div>

          <button
            className="google-btn"
            onClick={() =>
              (window.location.href = 'https://highwaydelitev2.onrender.com/api/auth/google')
            }
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              style={{ width: '20px', marginRight: '8px' }}
            />
            Sign in with Google
          </button>

          <p className="form-footer">
            Need an account?{' '}
            <a href="/signup" className="create-account-link">
              Create one
            </a>
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="login-image">
          <img src={bg} alt="Login visual" />
        </div>
      </div>
    </div>
  );
};

export default Login;

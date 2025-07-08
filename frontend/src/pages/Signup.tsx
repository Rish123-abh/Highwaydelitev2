import React, { useState } from 'react';
import {AxiosError} from 'axios';
import axios from '../api/axios';
import '../Signup.css';
import bg from '../assets/right-column.png';
import logo from '../assets/top.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DateInput from '../util/DateInput';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Signup: React.FC = () => {
  const [showOtp, setShowOtp] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    otp: '',
  });

  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'otp' && !/^\d*$/.test(value)) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const requestOtp = async () => {
    try {
      await toast.promise(
        axios.post('/auth/signup', {
          name: form.name,
          email: form.email,
          dateOfBirth: form.dateOfBirth,
        }),
        {
          pending: 'Sending OTP...',
          success: 'OTP sent to your email!',
         error: {
          render({ data }: { data: AxiosError<{ message: string }> }) {
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

  const verifyOtpAndSignup = async () => {
    try {
      const response = await toast.promise(
        axios.post('/auth/verify-otp-signup', {
          email: form.email,
          code: form.otp,
          name: form.name,
          dateOfBirth: form.dateOfBirth,
        }),
        {
          pending: 'Verifying OTP...',
          success: 'Signup successful!',
          error: {
            render({ data }: { data: AxiosError<{ message: string }> }) {
            return data?.response?.data?.message || 'Signup failed';
          },
          },
        }
      );

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      // Already handled by toast.promise
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpSent) {
      await verifyOtpAndSignup();
    } else {
      await requestOtp();
    }
  };

  return (
    <div className="container">
      <div className="signup-box">
        <div className="form-container">
          <img src={logo} alt="Logo" />
          <h2>Sign up</h2>
          <p>Sign up to enjoy the feature of HD</p>

          <form onSubmit={handleSubmit}>
  {/* Name */}
  <div className="floating-input">
    <input
      type="text"
      name="name"
      id="name"
      placeholder=" "
      value={form.name}
      onChange={handleChange}
      required
    />
    <label htmlFor="name">Your Name</label>
  </div>
  <DateInput
  value={form.dateOfBirth}
  onChange={(date) => setForm((prev) => ({ ...prev, dateOfBirth: date }))}
/>

  {/* Email */}
  <div className="floating-input">
    <input
      type="email"
      name="email"
      id="email"
      placeholder=" "
      value={form.email}
      onChange={handleChange}
      required
    />
    <label htmlFor="email">Email</label>
  </div>

  {/* OTP */}
{otpSent && (
  <div className="floating-input otp-input-wrapper">
    <input
      type={showOtp ? 'text' : 'password'}
      name="otp"
      id="otp"
      placeholder=" "
      maxLength={6}
      value={form.otp}
      onChange={handleChange}
      required
    />
    <label htmlFor="otp">OTP</label>

    <span
      className="otp-toggle-icon"
      onClick={() => setShowOtp((prev) => !prev)}
    >
      {showOtp ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
)}



  <button type="submit">
    {otpSent ? 'Sign Up' : 'Get OTP'}
  </button>
</form>


          <div className="or-divider">OR</div>

          <button
            className="google-btn"
            onClick={() =>
            (window.location.href =
              'https://subtle-lebkuchen-9a6199.netlify.app/api/auth/google')
            }
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              style={{ width: '20px', marginRight: '8px' }}
            />
            Sign in with Google
          </button>

          <p className="signin-text">
            Already have an account? <a href="/">Sign in</a>
          </p>
        </div>

        <div className="signup-image">
          <img src={bg} alt="Background" />
        </div>
      </div>
    </div>
  );
};

export default Signup;

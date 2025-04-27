import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';

const ForgotPassword = () => {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [buttonChange, setButtonChange] = useState("Send OTP");
  const [inputField, setInputField] = useState({ email: "", otp: "", newPassword: "" });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const handleSubmit = () => {
    if (!emailSubmit) {
      sendOtp();
    } else if (emailSubmit && !otpValidate) {
      verifyOtp();
    } else {
      changePassword();
    }
  };

  const sendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/gym/sendOtp", {
        data: { email: inputField.email }
      });
      setEmailSubmit(true);
      setButtonChange("Submit OTP");
      toast.success(response.data.message);
    } catch (err) {
      handleError(err);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post("http://localhost:4000/gym/checkOtp", {
        data: {
          email: inputField.email,
          otp: inputField.otp
        }
      });
      setOtpValidate(true);
      setButtonChange("Submit Password");
      toast.success(response.data.message);
    } catch (err) {
      handleError(err);
    }
  };

  const changePassword = async () => {
    try {
      const response = await axios.post("http://localhost:4000/gym/resetPassword", {
        data: {
          email: inputField.email,
          newPassword: inputField.newPassword
        }
      });
      toast.success(response.data.message);
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    if (err.response) {
      toast.error(err.response.data.message);
    } else {
      toast.error(err.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center p-4 bg-gray-100">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-white font-bold mb-8 text-center">Forgot Password</h2>

        {/* Email Field */}
        <input
          type="email"
          value={inputField.email}
          onChange={(e) => handleOnChange(e, "email")}
          className="w-full mb-4 text-white text-center border-2 border-slate-400 bg-slate-700 p-3 rounded-lg placeholder-gray-300"
          placeholder="Enter your email"
        />

        {/* OTP Field */}
        {emailSubmit && (
          <input
            type="text"
            value={inputField.otp}
            onChange={(e) => handleOnChange(e, "otp")}
            className="w-full mb-4 text-white text-center border-2 border-slate-400 bg-slate-700 p-3 rounded-lg placeholder-gray-300"
            placeholder="Enter OTP"
          />
        )}

        {/* New Password Field */}
        {otpValidate && (
          <input
            type="password"
            value={inputField.newPassword}
            onChange={(e) => handleOnChange(e, "newPassword")}
            className="w-full mb-6 text-white text-center border-2 border-slate-400 bg-slate-700 p-3 rounded-lg placeholder-gray-300"
            placeholder="Enter new password"
          />
        )}

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 w-full rounded-lg transition-all"
        >
          {buttonChange}
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;

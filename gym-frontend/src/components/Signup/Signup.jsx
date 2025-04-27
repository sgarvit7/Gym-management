import "./Signup.css";
import React, { useState } from "react";
import Modal from "../Modal/Modal.jsx";
import ForgotPassword from "../forgotPassword/ForgotPassword.jsx";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const [inputField, setInputField] = useState({
    gymName: "",
    email: "",
    userName: "",
    password: "",
    profilePic: "",
  });
  const [forgotPassword, setforgotPassword] = useState(false);

  const handleClose = () => {
    setforgotPassword((prev) => !prev);
  };

  const handleOnchange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gym-management");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvacsvlec/image/upload",
        data
      );
      const imageUrl = response.data.url;
      setInputField((prev) => ({ ...prev, profilePic: imageUrl }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://gym-management-m4b9.onrender.com/gym/register",
        {
          data: {
            userName: inputField.userName,
            password: inputField.password,
            profilePic: inputField.profilePic,
            gymName: inputField.gymName,
            email: inputField.email,
          },
        }
      );
      toast.success(response.data.message);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="CustomSignup w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 md:p-10 mt-10 md:mt-20 mx-auto h-fit overflow-y-auto">
      <div className="font-sans text-white-900 text-center text-3xl mb-4">
        Register
      </div>

      <input
        type="text"
        value={inputField.userName}
        onChange={(event) => handleOnchange(event, "userName")}
        className="w-full my-4 text-white bg-slate-800 p-2 rounded-lg"
        placeholder="Enter userName"
      />

      <input
        type="text"
        value={inputField.gymName}
        onChange={(event) => handleOnchange(event, "gymName")}
        className="w-full my-4 text-white bg-slate-800 p-2 rounded-lg"
        placeholder="Enter Gym Name"
      />

      <input
        type="text"
        value={inputField.email}
        onChange={(event) => handleOnchange(event, "email")}
        className="w-full my-4 text-white bg-slate-800 p-2 rounded-lg"
        placeholder="Enter Email"
      />

      <input
        type="password"
        value={inputField.password}
        onChange={(event) => handleOnchange(event, "password")}
        className="w-full my-4 text-white bg-slate-800 p-2 rounded-lg"
        placeholder="Enter Password"
      />

      <input
        onChange={uploadImage}
        type="file"
        className="w-full my-4 text-white bg-slate-800 p-2 rounded-lg"
      />

      <div
        className="p-2 w-[80%] md:w-[60%] my-6 border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
        onClick={handleRegister}
      >
        Register
      </div>

      <div
        className="p-2 w-[80%] md:w-[60%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
        onClick={handleClose}
      >
        Forgot Password
      </div>

      {forgotPassword && (
        <Modal
          header={"Reset Password"}
          handleClose={handleClose}
          content={<ForgotPassword />}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Signup;

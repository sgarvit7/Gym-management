import { useState } from "react";
import "./Login.css";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const Login = () => {
   const apiUrl  = 'https://gym-management-m4b9.onrender.com';

  const [loginFeild, setLoginFeild] = useState({ userName: "", password: "" });
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      console.log(apiUrl)
        console.log(loginFeild)
      const response = await axios.post("216.24.60.0/24/gym/Login",{
        data: {
          userName: loginFeild.userName,
        password: loginFeild.password
        }
      });
      navigate('/Dashboard')
      localStorage.setItem('gymName',response.data.data.gymName);
      localStorage.setItem('gymPic',response.data.data.profilePic);
      localStorage.setItem('isLogin',true);
      localStorage.setItem('token',response.data.token);
      
      console.log("Login successful:", response.data.data);
    } catch (err) {
      if (err.response) {
        // The server responded with a status other than 2xx
        toast.error( err.response.data.message);
      } else {
        // Some other error (e.g., network error)
        toast.error( err.message);
      }
    }
  }
    
  const handleOnChange = (event, name) => {
    setLoginFeild({ ...loginFeild, [name]: event.target.value });
  };
  return (
    <div className=" customLogin w-1/3 p-10 mt-20 ml-20  h-fit">
      <div className="font-sans text-white-900 text-center text-3xl">Login</div>

      <input
        onChange={(event) => {
          handleOnChange(event, "userName");
        }}
        value={loginFeild.userName}
        type="text"
        className="w-full my-10 text-white bg-slate-800 p-2 rounded-lg"
        placeholder="Enter userName"
      />

      <input
        onChange={(event) => {
          handleOnChange(event, "password");
        }}
        value={loginFeild.password}
        type="password"
        className="w-full mb-10 text-white bg-slate-800 p-2 rounded-lg"
        placeholder="Enter Password"
      />
      <div
        className="p-2 w-[60%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer "
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </div>
      <ToastContainer />
    </div>
  );
};
export default Login;

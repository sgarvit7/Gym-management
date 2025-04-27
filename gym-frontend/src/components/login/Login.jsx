import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const apiUrl = 'https://gym-management-m4b9.onrender.com';

  const [loginFeild, setLoginFeild] = useState({ userName: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/gym/Login`, {
        data: {
          userName: loginFeild.userName,
          password: loginFeild.password,
        },
      });

      localStorage.setItem("gymName", response.data.data.gymName);
      localStorage.setItem("gymPic", response.data.data.profilePic);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("token", response.data.token);

      navigate("/Dashboard");
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleOnChange = (event, name) => {
    setLoginFeild({ ...loginFeild, [name]: event.target.value });
  };

  return (
    <div className="customLogin w-full sm:w-2/3 md:w-1/2 lg:w-1/3 p-6 md:p-10 mt-10 md:mt-20 mx-auto h-fit">
      <div className="font-sans text-white-900 text-center text-3xl">Login</div>

      <input
        onChange={(event) => handleOnChange(event, "userName")}
        value={loginFeild.userName}
        type="text"
        className="w-full my-6 text-white bg-slate-800 p-2 rounded-lg"
        placeholder="Enter userName"
      />

      <input
        onChange={(event) => handleOnChange(event, "password")}
        value={loginFeild.password}
        type="password"
        className="w-full mb-6 text-white bg-slate-800 p-2 rounded-lg"
        placeholder="Enter Password"
      />

      <div
        className="p-2 w-[80%] md:w-[60%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
        onClick={handleLogin}
      >
        Login
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

import React from "react";
import Login from "../../components/login/Login.jsx";
import Signup from "../../components/Signup/Signup.jsx";

const Home = () => {
  return (
    <div className="w-full h-[100vh]">
      <div className="border-2 border-slate-800 bg-slate-800  text-white p-5 font-semibold text-xl">
        Welcome To Gym Management System
      </div>
      <div className="w-full bg-cover flex justify-center h-[100%] bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-large-room-full-of-equipment-in-a-gym-image_2549099.jpg')]">
        <div className="w-full lg:flex gap-45">
          <Login />
          <Signup/>
        </div>
      </div>
    </div>
  );
};
export default Home;

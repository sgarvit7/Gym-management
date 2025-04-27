import React from "react";
import Login from "../../components/login/Login.jsx";
import Signup from "../../components/Signup/Signup.jsx";

const Home = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      {/* Header */}
      <div className="border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-xl text-center">
        Welcome To Gym Management System
      </div>

      {/* Background Section */}
      <div
        className="flex-grow w-full bg-cover bg-center flex justify-center items-start md:items-center py-10"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-large-room-full-of-equipment-in-a-gym-image_2549099.jpg')",
        }}
      >
        {/* Responsive container */}
        <div className="w-full flex flex-col lg:flex-row gap-10 px-4 md:px-10 lg:px-20 xl:px-40">
          <Login />
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default Home;

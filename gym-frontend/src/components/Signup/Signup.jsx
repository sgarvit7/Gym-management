import "./Signup.css";
import React from "react";
import { useState } from "react";
import Modal from "../Modal/Modal.jsx";
import ForgotPassword from "../forgotPassword/ForgotPassword.jsx";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
const Signup = () => {
 
  const [inputField, setInputField] = useState({ gymName: "", email: "", userName: "", password: "", profilePic: "" })
  const [forgotPassword, setforgotPassword] = useState(false);
   const handleClose = () => {
    setforgotPassword((prev) => !prev);
  };
  const handleOnchange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value })
}

  const uploadImage=async(event)=>{
    console.log("image uploading")
    const files = event.target.files;
    const data = new FormData();
    data.append('file',files[0]);
    // dvacsvlec
    data.append('upload_preset',"gym-management");
    try{
        const response = await axios.post("https://api.cloudinary.com/v1_1/dvacsvlec/image/upload",data);
        console.log(response)
        const imageUrl = response.data.url;
        console.log(imageUrl)
        inputField.profilePic = imageUrl
    }
    catch(err){
      console.log(err);
    }
  }

  const handleRegister = async ()=>{
   
      try {
        const response = await axios.post("https://gym-management-m4b9.onrender.com/gym/register",{
          data:{
            userName : inputField.userName,
            password : inputField.password,
            profilePic : inputField.profilePic,
            gymName: inputField.gymName,
            email : inputField.email
          }
        });
        toast.success(response.data.message)
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


  return (
    <div className=" CustomSignup  w-1/3 p-10 mt-20 ml-20  h-[452px] overflow-y-auto ">
      <div className="font-sans text-white-900 text-center text-3xl">
        Register
      </div>
      <input
        type="text"
        value={inputField.userName} 
        onChange={(event) => { handleOnchange(event, "userName") }}
        className="w-full my-10 text-white bg-slate-800 p-2 rounded-lg"
        placeholder="Enter userName"
      />
      <input
        type="text"
        value={inputField.gymName} 
        onChange={(event) => { handleOnchange(event, "gymName") }}
        className="w-full  text-white bg-slate-800 p-2 rounded-lg"
        placeholder="Enter Gym Name"
      />
       <input
        type="text"
        value={inputField.email} 
        onChange={(event) => { handleOnchange(event, "email") }}
        className="w-full  text-white my-10 bg-slate-800 p-2 rounded-lg"
        placeholder="Enter Email"
      />
      <input
        type="password"
        
        value={inputField.password} 
        onChange={(event) => { handleOnchange(event, "password") }}
        className="w-full mb-10 text-white bg-slate-800 p-2 rounded-lg"
        placeholder="Enter Password"
      />
      <input
      onChange={(e)=>{uploadImage(e)}}
        type="file"
        className="w-full  text-white bg-slate-800 p-2 rounded-lg"
      />
      <div className="p-2 w-[60%] my-10 border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer " onClick={()=>handleRegister()}>
        Register
      </div>
      <div
        className="p-2 w-[60%]  border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer"
       onClick={()=>handleClose()}
      >
        Forgot Password
      </div>
      {forgotPassword && <Modal header={"Reset Password"} handleClose={handleClose} content ={<ForgotPassword/>}/> }
      <ToastContainer/>

    </div>
  );
};
export default Signup;

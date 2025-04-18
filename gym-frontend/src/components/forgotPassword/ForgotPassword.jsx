import React,{useState} from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';

const ForgotPassword = () => {

  const [emailSubmit,setEmailSubmit] = useState(false);
  const [otpValidate,setOtpValidate] = useState(false);
  const [buttonChange,setbuttonChange] = useState("Send OTP")
 
  const [inputField, setInputField] = useState({ email: "", otp: "", newPassword: "" });

  const handleOnChange =(event,name)=>{
    setInputField({...inputField,[name]:event.target.value})
}

    
  const handleSubmit =()=>{
    if(!emailSubmit){
        sendOtp();
    }else if(emailSubmit && !otpValidate){
    
        verifyOtp();
    }
    else{
      changePassword();
    }
  }
  const changePassword = async()=>{
    try {
      const response = await axios.post("http://localhost:4000/gym/resetPassword",{
        data:{
          email : inputField.email,
          newPassword : inputField.newPassword
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

  const verifyOtp = async()=>{
    try {
      const response = await axios.post("http://localhost:4000/gym/checkOtp",{
        data:{
          email : inputField.email,
          otp : inputField.otp
        }
      });
            setOtpValidate(true);

      setbuttonChange("Submit password")

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
  

  const sendOtp = async()=>{
    try {
      const response = await axios.post("http://localhost:4000/gym/sendOtp",{
        data:{
          email : inputField.email
        }

      });
      setEmailSubmit(true)
        setbuttonChange("Submit OTP")
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
    <div className="w-full">
      <div className="w-full mb-5">
        {/* <div className="text-xl ml-10">Enter your Email</div> */}
        <input
        value={inputField.email} 
        onChange={(event) => {handleOnChange(event, "email") }}
          type="text"
          className="w-3/4 text-white border-2 text-center ml-10 border-slate-400 bg-slate-800 p-2 rounded-lg"
          placeholder="Enter Email"
        />
      </div>

        {
            emailSubmit && 
            <div className="w-full mb-5">
              {/* <div>Enter your OTP</div> */}
              <input
                type="text"
                value={inputField.otp} 
        onChange={(event) => {handleOnChange(event, "otp") }}
          
                className="w-3/4 ml-10 text-white text-center border-2 border-slate-400 bg-slate-800 p-2 rounded-lg"
                placeholder="Enter OTP"
              />
            </div>
      
        }
        
        {
            otpValidate && 
            <div className="w-full mb-5">
              {/* <div>Enter your New Password</div> */}
              <input
                type="text"
                value={inputField.newPassword} 
        onChange={(event) => {handleOnChange(event, "newPassword") }}
          
                className="w-3/4 ml-10 text-center text-white border-2 border-slate-400 bg-slate-800 p-2 rounded-lg"
                placeholder="Enter New password"
              />
            </div>
      
        }
        <div className="bg-slate-800 text-white mx-auto w-1/3 p-3 rounded-lg text-center font-semibold cursor-pointer border-2 hover:bg-white hover:text-black" onClick={()=>handleSubmit()}>{buttonChange}</div>
    <ToastContainer/>
    </div>

  );
};
export default ForgotPassword;

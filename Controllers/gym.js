import {Gym} from "../Modals/gym.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import 'dotenv/config';
import jwt from 'jsonwebtoken';
export const register = async (req, res) => {
  try {
    const {data} = req.body;

    const isExist = await Gym.findOne({ userName : data.userName });
    if (isExist) {
      res.status(400).json({
        error: "username already exist ,please try with other userName",
      });
    } else {
      const newGym = new Gym({
        userName : data.userName,
        password : data.password,
        gymName : data.gymName,
        profilePic : data.profilePic,
        email : data.email,
      });
      await newGym.save();
        return res
        .status(201)
        .json({
          message: "user registered successfully",
          success: "yes",
          data: newGym,
        });
      }
    }
  catch {
    return res
    .status(500).json({
      error: "server error",
    });
  }
};

const cookieOPtion = {
  httpOnly:true,
  secure:false,
  sameSite:'Lax'
}

export const signIN = async(req,res)=>{
  const {data} = req.body;
  const gym =  await Gym.findOne({userName:data.userName,password:data.password});
  console.log(gym)

  if(gym){
    const token = jwt.sign({gym_id :gym._id},process.env.JWT_SECRET_KEY);
   
    res.cookie("cookie_token",token,cookieOPtion)
    return res
    .status(201)
    .json({message:"user found",data:gym,token})
     
  }
  else{
    return res
    .status(409)
    .json({message:"invalid credentials"})
  }
};

const transporter = nodemailer.createTransport({
  service :'gmail',
  port: 587,
  secure: false,
  auth :{
    user :process.env.SENDER_EMAIL,
    pass: process.env.PASSWORD
  }

});

export const sendOtp = async(req,res)=>{
  try{
    const {data} = req.body;
    const gym = await Gym.findOne({email : data.email});
    if(gym){
      const buffer = crypto.randomBytes(4);
      const token = buffer.readUInt32BE(0)% 900000 + 100000;
      gym.resetPasswordToken = token;
      gym.resetPasswordExpires = Date.now() + 3600000;
    
      await gym.save();

      const mailOptions = {
        from:'ssgarvit7@gamail.com',
        to:data.email,
        subject : 'password reset',
        text : `your OTP for password reset is : ${token}`
      };

      transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
          return res
          .status(500)
          .json({message:error})
        }
        else{
          return res
          .status(200)
          .json({message:"Otp send to your mail"})
        }
      })  
    }else{
      return res
      .status(400)
      .json({message:"gym not found"})
    }

  }catch(err){
    res.status(500).json({
      error:"server Error"
    })
  }
}

export const checkOtp  = async(req,res)=>{
  try{
      const {data} = req.body;
      const gym = await Gym.findOne({
        email : data.email,
        resetPasswordToken : data.otp,
        resetPasswordExpires :{$gt:Date.now()}
      });
      if(!gym){
        return res
        .status(400)
        .json({error:"otp is invalid or expired"});
      }
      res.status(200).json({message:"otp is successfully verified"})
  }
  catch(error){
    return res 
    .status(400)
    .json({message:"error occured"})
  }
}

export const resetPassword = async(req,res)=>{
  try{
    const {data} = req.body;
      const gym = await Gym.findOne({email:data.email});

      if(!gym){
        return res.status(400).json({message:" some technical issue , please try again later"});
      }
      gym.password = data.newPassword;
      gym.resetPasswordToken = undefined;
      gym.resetPasswordExpires = undefined;
      await gym.save();
      return res
      .status(200)
      .json({message:"successfull"})
  }
  catch(err){
    return res.status(400).json({message:err})

  }
} 

export const checking = (req,res)=>{
  try{
    console.log("here in checking")
    console.log(req.gym.userName);
  return res
  .status(200)
  .json({message:"token verified succesfully"})
  }
  catch(error){
    console.log(error)
    return res 
    .status(500)
    .json({message:"error"})
  }
}

export const logout = async (req,res)=>{
  res.clearCookie('cookie_token',cookieOPtion).json({message:"logout successfully"})
}
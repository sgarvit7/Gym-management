import { Gym } from "../Modals/gym.js";
import jsonwebtoken from "jsonwebtoken";
import 'dotenv/config';
// const auth = async(req,res,next)=>{
// try{
//     const token = req.cookies.cookie_token;
 
//         if(!token){
//             return res.status(401).json({error:"no token, authorization denied"});
//         }
//         else{  const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
//         req.gym = await Gym.findById(decode.gym_id);
//         next();
// }
// }
// catch(error){
//     return res
//     .status(400).json({message:error.message});
// }
// }

const auth = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No token, authorization denied" });
      }
  
      const token = authHeader.split(" ")[1];
      
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET_KEY);
      req.gym = await Gym.findById(decoded.gym_id);
      
      if (!req.gym) {
        return res.status(404).json({ error: "Gym not found" });
      }
      next();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
  

export default auth;
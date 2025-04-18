import express from 'express';
import { checking, checkOtp,  logout, register, resetPassword, sendOtp, signIN} from '../Controllers/gym.js';
import auth from '../Auth/auth.js';

const route = express.Router();

route.post('/register',register);
route.post('/Login',signIN);
route.post('/sendOtp',sendOtp);
route.post('/checkOtp',checkOtp);
route.post('/resetPassword',resetPassword);
route.post('/logout',logout);
route.get('/checking',auth,checking);
export default route;
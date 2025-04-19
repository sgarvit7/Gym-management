import express from 'express';
import cors from "cors";
import bodyParser from "body-parser"
import'./DBconn/conn.js';
import route from './Routes/gym.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import packs from './Routes/membership.js';
import member from './Routes/member.js';
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:'https://gym-management-sigma-mocha.vercel.app',
    credentials:true
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    console.log("Request Headers:", req.headers);
    next();
});

app.use(express.json());
app.use('/gym',route);
app.use('/pack',packs);
app.use('/member',member);



app.listen(4000,()=>{
    console.log("app is running on port 4000")
});

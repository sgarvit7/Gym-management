import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(process.env.MONGO)
.then(() => {
console.log("database connected")    
}).catch((err) => {
    console.log(err)

});
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/gym')
.then(() => {
console.log("database connected")    
}).catch((err) => {
    console.log(err)

});
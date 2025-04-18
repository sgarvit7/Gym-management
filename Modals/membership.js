import mongoose from "mongoose";

const membershipSchema = mongoose.Schema({
    month:{
        type:Number,
        reqyired:true
    },
    price:{
        type:Number,
        reqyired:true
    },
    gym:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"gym",
        reqyired:true
    },

})
export const membership = mongoose.model("membership",membershipSchema);
 

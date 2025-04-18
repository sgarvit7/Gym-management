import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profilePic: { type: String },
    status:{require:true,type:String,default:"Active"},
    membership: { type: mongoose.Schema.Types.ObjectId, ref: 'Membership', required: true },  // lowercase
    gym: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym' },
    address: { type: String },
    MobileNo: { type: String, required: true },
    nextBillDate: { type: Date },
    joininDate : {type:Date}
},{timestamps:true});
export const member = mongoose.model("member",memberSchema);


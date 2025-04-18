import { member} from "../Modals/member.js";
import { membership } from "../Modals/membership.js";
import mongoose from 'mongoose';

export const getAllMember = async (req, res) => {
  try {
    const { skip, limit } = req.query;
    const members = await member.find({ gym: req.gym._id });
    const totalMember = members.length;

    const limitedMember = await member
      .find({ gym: req.gym._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      message: members.length
        ? "Fetched members successfully"
        : "no any members registered yet",
      members: limitedMember,
      totalMembers: totalMember,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message : "server error" });
  }
};
// check the correct date for billing as the code is shit for that
export const registerMember = async (req, res) => {
  try {
    const { data } = req.body;
    

       if (!data.membership || !mongoose.Types.ObjectId.isValid(data.membership)) {
      return res.status(400).json({ error: "Invalid or missing membership ID" });
    }

    // Check for existing member with the same mobile number
    const existingMember = await member.findOne({ gym: req.gym._id, MobileNo:data.mobileNo });
    if (existingMember) {
      return res
        .status(409)
        .json({ message : "Already registered with this mobile no" });
    }
    console.log(data.membership)
    // Validate membership
    const MemberShip = await membership.findOne({
      _id: data.membership,
      gym: req.gym._id,
    });
    console.log(MemberShip)

    if (!MemberShip) {
      return res.status(404).json({ message : "Membership not found" });
    }

    const membershipMonth = MemberShip.month;

    // Calculate next billing date
    let jngDate = new Date(data.joiningDate);

    const nextBillDate = addMonthsToDate(membershipMonth, jngDate);
      console.log(data)
    // Correctly assign the field names as per schema
    let newMember = new member({
      name : data.name,
      profilePic : data.profilePic,
      membership: data.membership, // Use lowercase `membership` to match the schema
      gym: req.gym._id,
      address : data.address,
      MobileNo : data.mobileNo,
      nextBillDate,
      joininDate : data.joiningDate
    });

    await newMember.save();
    return res
      .status(200)
      .json({ message: "Member registered successfully", newMember });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message : "Server error" });
  }
};

function addMonthsToDate(months, joiningDate) {
  // Get current year, month, and day
  let today = joiningDate;
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // Months are 0-indexed
  const currentDay = today.getDate();

  // Calculate the new month and year
  const futureMonth = currentMonth + months;
  const futureYear = currentYear + Math.floor(futureMonth / 12);

  // Calculate the correct future month (modulus for month)
  const adjustedMonth = futureMonth % 12;

  // Set the date to the first of the future month
  const futureDate = new Date(futureYear, adjustedMonth, 1);

  // Get the last day of the future month
  const lastDayOfFutureMonth = new Date(
    futureYear,
    adjustedMonth + 1,
    0
  ).getDate();

  // Adjust the day if current day exceeds the number of days in the new month
  const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);

  // Set the final adjusted day
  futureDate.setDate(adjustedDay);

  return futureDate;
}

export const searchMember = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const Member = await member.find({
      gym: req.gym._id,
      $or: [
        { name: { $regex: "^" + searchTerm, $options: "i" } },
        { Mobileno: { $regex: "^" + searchTerm, $options: "i" } },
      ],
    });
    res.status(200).json({
      message: Member.length
        ? "fetched Members successfully"
        : "no such member",
      Member: Member,
      totalMember: Member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};
export const monthlyMember = async (req, res) => {
  try {
    const now = new Date();

    const startofMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endofMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const Member = await member
      .find({
        gym: req.gym._id,
        createdAt: {
          $gte: startofMonth,
          $lte: endofMonth,
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: Member.length
        ? "Fetched members successfully"
        : "no such members registered yet",
      Member: Member,
      totalMembers: Member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

export const expiringin3days = async (req, res) => {
  try {
    const today = new Date();
    const nextThreeDays = new Date();
    nextThreeDays.setDate(today.getDate() + 3);

    const Member = await member.find({
      gym: req.gym._id,
      nextBillDate: {
        $gte: today,
        $lte: nextThreeDays,
      },
    });
    res.status(200).json({
      message: Member.length
        ? "Fetched members successfully"
        : "no such members registered yet",
      Member: Member,
      totalMembers: Member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

export const expiringin4to7days = async (req, res) => {
  try {
    const today = new Date();
    const next4Days = new Date();
    next4Days.setDate(today.getDate() + 4);

    const next7days = new Date();
    next7days.setDate(today.getDate() + 7);

    const Member = await member.find({
      gym: req.gym._id,
      nextBillDate: {
        $gte: next4Days,
        $lte: next7days,
      },
    });
    res.status(200).json({
      message: Member.length
        ? "Fetched members successfully for 4-7 days"
        : "no such members registered yet",
      Member: Member,
      totalMembers: Member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

export const expiredMember = async (req, res) => {
  try {
    const today = new Date();
    const Member = await member.find({
      gym: req.gym._id,
      status: "Active",
      nextBillDate: {
        $lte: today,
      },
    });

    res.status(200).json({
      message: Member.length
        ? "Fetched members successfully for 4-7 days"
        : "no such members registered yet",
      Member: Member,
      totalMembers: Member.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "server error" });
  }
};

export const inActiveMember = async(req,res)=>{
    try{
        const Member = await member.find({gym:req.gym._id,status:"pending"});
        res.status(200).json({
            message: Member.length
              ? "Fetched members successfully for 4-7 days"
              : "no such members registered yet",
            Member: Member,
            totalMembers: Member.length,
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({ error: "server error" });
        }

    
}
export const getMemberDetails = async(req,res)=>{
    try{
        const{id} = req.params;
        const Member = await member.findOne({_id:id,gym:req.gym._id});
        if(!Member){
            return res.status(400).json({
                error:"no such Member"
            })
        }
        res.status(200).json({
            message:"Member Data Fetched",
            Member:Member
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:"server Error"})
    }
}

export const changeStatus = async(req,res)=>{
    try{
        const {id} = req.params;
        const {status} = req.body;
        const Member = await member.findOne({_id:id,gym:req.gym._id});
        if(!Member){
            return res.status(400).json({
                error:"No such Member"
            })
        }
        Member.status = status;
        await Member.save();
        return res.status(200)
        .json({
            message :"status changed successfully"
        })

    }catch(err){
        console.log(err)
        return res.status(500).json({error : "server error"});
    }
}

export const updateMemberPlan = async(req,res)=>{
    try{
        const{Memberships} = req.body;
        console.log(Memberships)
        const {id} = req.params;
        const Membership = await membership.findOne({gym:req.gym._id, _id:Memberships});
        if(Membership){
            let getMonth = Membership.month;
            let today = new Date();
            let nextBillDate = addMonthsToDate(getMonth,today);
            const Member = await member.findOne({gym:req.gym._id,_id:id});
            if(!Member){
                return res.status(409).json({error:"no such member are there"})
            }
            Member.nextBillDate = nextBillDate;
            Member.lastPayment = today;
            await Member.save();
            return res.status(200).json({message:"member renewwd successfully",Member});
        }
        else{
            return res.status(409).json({error:"no such membership are there"})
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"internal server error"});
    }
}
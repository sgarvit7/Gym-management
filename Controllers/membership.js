import {membership} from "../Modals/membership.js";



export const addMembership = async(req,res)=>{
    try{
            const{data}= req.body;
            console.log(data)
            const Membership = await membership.findOne({gym:req.gym._id,month:data.months});
            if(Membership){
                Membership.price = data.price;
                await Membership.save();
                return res
                .status(200)
                .json({message:"updated successfully"})
            }
            else{
                const newMembership = new membership({price:data.price,month:data.months,gym:req.gym._id});
                await newMembership.save();
                return res 
                .status(200)
                .json({message:"Added successfully"})
            }
    }
    catch(err){
        console.log(err);
        return res
        .status(500)
        .json({error:"server error"})
    }
}

export const getMembership = async(req,res)=>{
    try{
        const loggedInId = req.gym._id;
        const Membership = await membership.find({gym:loggedInId});
        res.status(200).json({
            message:"Membership fetched successfully",
            Membership : Membership
        })

    }
    catch(err){
        console.log(err);
        return res
        .status(500)
        .json({error:"server error"})
    }
}
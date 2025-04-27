import { Link } from "react-router-dom";
import MemberCard from "../../components/MemberCard/MemberCard";
import { useEffect, useState } from "react";
import { expired, expiringSoon, inActive, monthlyJoined, threeDays } from "./data";
import { ToastContainer } from "react-toastify";

const GeneralUser = ()=>{

    const [header,setHeader] = useState("");
    const [data,setData] = useState([]);
    useEffect(()=>{
        const func = sessionStorage.getItem('func');
        functionCall(func);
    },[])
    const functionCall = async(func)=>{
            switch (func){
                case "Monthly":
                  const datas = await monthlyJoined();
                  setData(datas);

                    setHeader("Monthly joined member")
                    break;
                case "3days":
                  const datatd = await threeDays();
                  setData(datatd);
                    setHeader("Expiring in 3 days")
                    break;
                    
                case "expiringSoon":
                  const dataes = await expiringSoon();
                  setData(dataes);
                    setHeader("Expiring Soon")
                    break;
                    
                 case "Expired":
                  const datae = await expired();
                  setData(datae);
                    setHeader("Expired")
                    break;
                    
                    case "Inactive":
                      const datain = await inActive();
                      setData(datain);
                        setHeader("InActive")
                        break;
            }
    }

    return(
 <div className="text-black  h-[100vh]">
      {/* block for banner */}
      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
        <Link to={'/Dashboard'}
          className="border-2 pl-3 pr-3 pt-1 rounded-2xl flex cursor-pointer hover:bg-white  hover:text-black"
        >
          Back to Dashboard
          {/* <img className="w-8 h-8" src={dumbell} /> */}
        </Link>   
      </div>
      <div className="mt-5 ml-5 text-xl text-slate-900">
        {/* {header} */}
      </div>
       <div>
      <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]">

        
       {
          data.map((item,index)=>{
            return(
                <MemberCard  key={item._id || index} item={item}/>
            )
            
}
       ) }

      </div>
     </div>


    <ToastContainer/>        
    </div>
    
    )
}
export default GeneralUser;
import { Link } from "react-router-dom";
import { use, useEffect, useState } from "react";
import MemberCard from "../../components/MemberCard/MemberCard";
import dumbell from "./gym2.png";
import ra from "./right-arrow.png";
import la from "./left-arrow.png";
import add from "./add.png";
import Modal from "../../components/Modal/Modal.jsx";
import ForgotPassword from "../../components/forgotPassword/ForgotPassword.jsx";
import AddMember from "../../components/AddMember/AddMember.jsx";
import AddMem from "../../components/AddMem/AddMem.jsx";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { member } from "../../../../Modals/member.js";

const Member = () => {
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(9);
  const [noOfpage, setnoOfpage] = useState(0);
  const [data,setData] = useState([]);
  const [skip,setSkip] = useState(0)
  const [search,setSearch] = useState("")
  const [isSearchModeOn,setSearchMode] = useState(false)

  const handlePrev = () => {
    if (currentPage !== 1) {
      let currPage = currentPage - 1;
      setCurrentPage(currPage);
      var from = (currPage - 1) * 9;
      var to = currPage * 9;
      setStartFrom(from);
      setEndTo(to);
      
      let skipValue = skip-9;
      setSkip(skipValue);
      fetchData(skipValue,9);
    }
  };

  const handleNext = () => {
    if (currentPage !== noOfpage) {
      let currPage = currentPage + 1;
      setCurrentPage(currPage);
      var from = (currPage - 1) * 9;
      var to = currPage * 9;
      if (to > totalData) {
        to = totalData;
      }
      setStartFrom(from);
      setEndTo(to);
      let skipValue = skip+9;
      setSkip(skipValue);
      fetchData(skipValue,9);
    }
  };

  const [addMembership, setAddMemberShip] = useState(false);
  const handleMembership = () => {
    setAddMemberShip((prev) => !prev);
  };
  const [addMember, setAddMember] = useState(false);
  const handleMember = () => {
    setAddMember((prev) => !prev);
  };
  const [currentPage, setCurrentPage] = useState(1);

  

  useEffect(() => {
    fetchData(0, 9);
  }, []);

  const fetchData = async (skip, limit) => {
    try {
      const res = await axios.get(
        `https://gym-management-m4b9.onrender.com/member/getMembers?skip=${skip}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setData(res.data.members)
      let totalData = res.data.totalMembers;
      console.log(totalData);
      setTotalData(totalData);
      let extraPage = totalData % limit === 0 ? 0 : 1;
      let totalPage = parseInt(totalData / limit) + extraPage;
      setnoOfpage(totalPage);
      if (totalData === 0) {
        setStartFrom(-1);
        setEndTo(0);
      } else if (totalData < 9) {
        setStartFrom(0);
        setEndTo(totalData);
      }
      // toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(res.data.err);
    }
  };

const handleSearchData = async ()=>{
  try {
  if(search !==""){
      const res = await axios.get(
        `https://gym-management-m4b9.onrender.com/member/searchMember?searchTerm=${search}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setSearchMode(true);
      if(!res.data.totalMember){
      
        window.location.reload();
        alert("No Such Member Found")
       
      }
      setData(res.data.Member)
      // console.log(res)
  }
  else{
    if(isSearchModeOn){
      window.location.reload();
    }
    else{
      toast.error("please enter any value")
    }
  }
}
catch (err) {
  console.log(err);
  toast.error(res.data.err);
}
}

  return (
    <div className="text-black p-5 w-3/4 h-[100vh]">
      {/* block for banner */}
      <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">
        <div
          className="border-2 pl-3 pr-3 pt-1 rounded-2xl flex cursor-pointer hover:bg-white  hover:text-black"
          onClick={() => handleMember()}
        >
          Add Member
          <img className="w-8 h-8" src={dumbell} />
        </div>
        <div
          className="border-2 pl-3 pr-3 flex pt-1 rounded-2xl cursor-pointer hover:bg-white  hover:text-black"
          onClick={() => handleMembership()}
        >
          Membership
          <img className="w-7 h-7 ml-1" src={add} />
        </div>
      </div>

      {/* back to dashboard */}
      <Link to={"/Dashboard"}>Back to Dashboard</Link>

      <div className="mt-5 w-1/2 flex gap-2">
        <input
          type="text"
          value={search}
          onChange={(e)=>{setSearch(e.target.value)}}
          className="border-2 w-full p-2 rounded-lg"
          placeholder="search by Name"
        />
        <div onClick={()=>{handleSearchData()}} className="bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer">
          <img src="search"/>
        
          
        </div>
      </div>

      <div className="mt-5 text-xl flex justify-between text-slate-900">
        <div>Total Members</div>
        {

        !isSearchModeOn?<div className="gap-2 flex">
          <div className="flex ">
            {startFrom + 1}-{endTo} of {totalData} member
          </div>
          <div
            className={`w-8 h-8 cursor-pointer border-2 flex items-center justify-center hover:text-white `}
            onClick={() => {
              handlePrev();
            }}
          >
            <img src={la} />
          </div>

          <div
            className={`w-8 h-8 cursor-pointer border-2  flex items-center justify-center hover:text-white 
        `}
            onClick={() => {
              handleNext();
            }}
          >
            <img src={ra} />
          </div>
        </div>:null}
      </div>

      <div className="bg-slate-100 p-5 mt-5 rounded-lg grid gap-2 grid-cols-3 overflow-x-auto h-[65%]">
            {
              data.map((item,index)=>{
                return(
                <MemberCard  key={item._id || index} item={item}/>
                )
              })
            }
      </div>
      {addMembership && (
        <Modal
          header={"Add Membership"}
          handleClose={handleMembership}
          content={<AddMember handleClose={handleMembership} />}
        />
      )}
      {addMember && (
        <Modal
          header={"Add Member"}
          handleClose={handleMember}
          content={<AddMem handleClose={handleMember} />}
        />
      )}
      <ToastContainer/>
    </div>
  );
};
export default Member;

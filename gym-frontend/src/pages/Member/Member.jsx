import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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

const Member = () => {
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(9);
  const [noOfpage, setnoOfpage] = useState(0);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [isSearchModeOn, setSearchMode] = useState(false);
  const [addMembership, setAddMembership] = useState(false);
  const [addMember, setAddMember] = useState(false);
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
      setData(res.data.members);
      const total = res.data.totalMembers;
      setTotalData(total);
      const extraPage = total % limit === 0 ? 0 : 1;
      setnoOfpage(parseInt(total / limit) + extraPage);

      if (total === 0) {
        setStartFrom(-1);
        setEndTo(0);
      } else if (total < 9) {
        setStartFrom(0);
        setEndTo(total);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Error fetching data");
    }
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      let currPage = currentPage - 1;
      setCurrentPage(currPage);
      let from = (currPage - 1) * 9;
      let to = currPage * 9;
      setStartFrom(from);
      setEndTo(to);
      let skipValue = skip - 9;
      setSkip(skipValue);
      fetchData(skipValue, 9);
    }
  };

  const handleNext = () => {
    if (currentPage !== noOfpage) {
      let currPage = currentPage + 1;
      setCurrentPage(currPage);
      let from = (currPage - 1) * 9;
      let to = currPage * 9;
      if (to > totalData) to = totalData;
      setStartFrom(from);
      setEndTo(to);
      let skipValue = skip + 9;
      setSkip(skipValue);
      fetchData(skipValue, 9);
    }
  };

  const handleSearchData = async () => {
    try {
      if (search.trim() !== "") {
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
        if (!res.data.totalMember) {
          window.location.reload();
          alert("No Such Member Found");
        } else {
          setData(res.data.Member);
        }
      } else {
        if (isSearchModeOn) {
          window.location.reload();
        } else {
          toast.error("Please enter a value to search");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Search failed");
    }
  };

  const handleMembership = () => setAddMembership((prev) => !prev);
  const handleMember = () => setAddMember((prev) => !prev);

  return (
    <div className="text-black p-4 w-full min-h-screen bg-white">
      {/* Action Buttons */}
      <div className="border-2 bg-slate-900 flex flex-col sm:flex-row justify-between items-center w-full text-white rounded-lg p-3 gap-3">
        <div
          className="border-2 pl-4 pr-4 pt-2 pb-2 rounded-2xl flex items-center gap-2 cursor-pointer hover:bg-white hover:text-black transition"
          onClick={handleMember}
        >
          Add Member
          <img className="w-6 h-6" src={dumbell} alt="Add Member" />
        </div>
        <div
          className="border-2 pl-4 pr-4 pt-2 pb-2 rounded-2xl flex items-center gap-2 cursor-pointer hover:bg-white hover:text-black transition"
          onClick={handleMembership}
        >
          Membership
          <img className="w-6 h-6" src={add} alt="Add Membership" />
        </div>
      </div>

      {/* Back to dashboard */}
      <div className="mt-4">
        <Link to={"/Dashboard"} className="text-blue-600 underline">
          Back to Dashboard
        </Link>
      </div>

      {/* Search */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full sm:w-1/2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 p-3 rounded-lg w-full"
          placeholder="Search by Name"
        />
        <div
          onClick={handleSearchData}
          className="bg-slate-900 p-3 border-2 text-white rounded-lg cursor-pointer flex items-center justify-center hover:bg-slate-700 transition"
        >
          🔍
        </div>
      </div>

      {/* Member Stats and Pagination */}
      <div className="mt-6 text-xl flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-900">
        <div>Total Members</div>

        {!isSearchModeOn && (
          <div className="flex items-center gap-4">
            <div>
              {startFrom + 1}-{endTo} of {totalData} members
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 border-2 flex items-center justify-center rounded hover:bg-slate-900 hover:text-white transition"
              >
                <img src={la} alt="Previous" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 border-2 flex items-center justify-center rounded hover:bg-slate-900 hover:text-white transition"
              >
                <img src={ra} alt="Next" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Member Cards */}
      <div className="bg-slate-100 p-5 mt-6 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
        {data.map((item, index) => (
          <MemberCard key={item._id || index} item={item} />
        ))}
      </div>

      {/* Modals */}
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

      <ToastContainer />
    </div>
  );
};

export default Member;

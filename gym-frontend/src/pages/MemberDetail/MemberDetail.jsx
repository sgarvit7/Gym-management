import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const MemberDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputField, setInputField] = useState({ membership: "" });
  const [data, setData] = useState({});
  const [status, setStatus] = useState("false");
  const [selectedOption, setSelectedOption] = useState("");
  const [memberships, setMembership] = useState([]);
  const [renew, setRenew] = useState(false);

  const handleSwitchToggle = () => {
    setStatus(status === "Active" ? "Pending" : "Active");
  };

  const handleRenew = () => setRenew((prev) => !prev);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `https://gym-management-m4b9.onrender.com/member/memberDetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setData(res.data.Member);
      setStatus(res.data.Member.status);
      toast.success("Data fetched successfully");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to fetch data");
    }
  };

  const fetchMemberships = async () => {
    try {
      const res = await axios.get(
        "https://gym-management-m4b9.onrender.com/pack/getMembership",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      setMembership(res.data.Membership || []);
      if (res.data.Membership.length === 0) {
        return toast.error("No Membership added yet");
      }
      const defaultId = res.data.Membership[0]._id;
      setSelectedOption(defaultId);
      setInputField({ ...inputField, membership: defaultId });
      toast.success(res.data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to fetch memberships");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    setInputField({ ...inputField, membership: e.target.value });
  };

  const isDateInPast = (inputDate) => {
    const today = new Date();
    const givenDate = new Date(inputDate);
    return givenDate < today;
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://gym-management-m4b9.onrender.com/member/updateMembership/${id}`,
        { Memberships: selectedOption },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="w-full min-h-screen bg-white p-4">
      {/* Go Back */}
      <div className="flex">
        <div
          onClick={() => navigate(-1)}
          className="border-2 bg-slate-900 text-white pl-4 pr-4 pt-2 pb-2 rounded-2xl cursor-pointer hover:bg-white hover:text-black transition"
        >
          Go Back
        </div>
      </div>

      {/* Main Section */}
      <div className="mt-10 flex flex-col md:flex-row gap-6">
        {/* Profile Picture */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={data.profilePic}
            alt="Profile"
            className="w-60 h-60 object-cover rounded-full shadow-md"
          />
        </div>

        {/* Member Info */}
        <div className="w-full md:w-2/3 text-xl">
          <div className="mb-4 font-semibold">Name: {data.name}</div>
          <div className="mb-4 font-semibold">Mobile: {data.MobileNo}</div>
          <div className="mb-4 font-semibold">Address: {data.address}</div>
          <div className="mb-4 font-semibold">Joined Date: {data.joininDate}</div>
          <div className="mb-4 font-semibold">Next Bill Date: {data.nextBillDate}</div>
          <div className="mb-6 font-semibold flex items-center gap-4">
            Status:
            <Switch
              onColor="#6366f1"
              checked={status === "Active"}
              onChange={handleSwitchToggle}
            />
          </div>

          {/* Renew Button */}
          {isDateInPast(data.nextBillDate) && (
            <div
              onClick={handleRenew}
              className="rounded-lg p-3 border-2 border-slate-900 text-center cursor-pointer hover:bg-black hover:text-white transition w-full md:w-1/2"
            >
              Renew
            </div>
          )}
        </div>
      </div>

      {/* Renew Membership Form */}
      {renew && (
        <div className="bg-slate-50 p-5 mt-8 rounded-lg max-w-2xl mx-auto">
          <div className="text-lg mb-4">Renew Membership</div>
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="border-2 w-full p-3 rounded-lg text-lg"
          >
            {memberships.map((item, index) => (
              <option key={index} value={item._id}>
                {item.month} Months Membership
              </option>
            ))}
          </select>
          <div
            onClick={handleSave}
            className="mt-4 rounded-lg p-3 border-2 border-slate-900 text-center cursor-pointer hover:bg-black hover:text-white transition text-lg"
          >
            Save
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default MemberDetail;

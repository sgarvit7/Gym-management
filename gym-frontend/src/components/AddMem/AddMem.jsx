import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddMem = () => {
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    membership: "",
    profilePic:
      "https://th.bing.com/th/id/OIP.gj6t3grz5no6UZ03uIluiwHaHa?rs=1&pid=ImgDetMain",
    joiningDate: "",
  });

  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "gym-management");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvacsvlec/image/upload",
        data
      );
      const imageUrl = response.data.url;
      setInputField({ ...inputField, profilePic: imageUrl });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMembership = async () => {
    try {
      const res = await axios.get("https://gym-management-m4b9.onrender.com/pack/getMembership", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      setMembershipList(res.data.Membership);
      if (res.data.Membership.length === 0) {
        return toast.error("No Membership added yet,", {
          className: "text-lg",
        });
      } else {
        const a = res.data.Membership[0]._id;
        setSelectedOption(a);
        setInputField({ ...inputField, membership: a });
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const handleOnChangeSelect = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setInputField({ ...inputField, membership: value });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://gym-management-m4b9.onrender.com/member/registerMember",
        {
          data: {
            name: inputField.name,
            address: inputField.address,
            profilePic: inputField.profilePic,
            mobileNo: inputField.mobileNo,
            joiningDate: inputField.joiningDate,
            membership: selectedOption,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="text-black p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <input
          type="text"
          value={inputField.name}
          onChange={(event) => handleOnChange(event, "name")}
          className="border-2 w-full sm:w-[90%] p-3 border-slate-400 rounded-md"
          placeholder="Name"
        />
        <input
          type="text"
          value={inputField.mobileNo}
          onChange={(event) => handleOnChange(event, "mobileNo")}
          className="border-2 w-full sm:w-[90%] p-3 border-slate-400 rounded-md"
          placeholder="Mobile No."
        />
        <input
          type="text"
          value={inputField.address}
          onChange={(event) => handleOnChange(event, "address")}
          className="border-2 w-full sm:w-[90%] p-3 border-slate-400 rounded-md"
          placeholder="Address"
        />
        <input
          type="date"
          value={inputField.joiningDate}
          onChange={(event) => handleOnChange(event, "joiningDate")}
          className="border-2 w-full sm:w-[90%] p-3 border-slate-400 rounded-md"
        />
        <select
          value={selectedOption}
          onChange={handleOnChangeSelect}
          className="border-2 w-full sm:w-[90%] p-3 border-slate-400 rounded-md"
        >
          {membershipList.map((item, index) => (
            <option key={index} value={item._id}>
              {item.month} Months Membership
            </option>
          ))}
        </select>

        {/* Image Upload */}
        <input type="file" onChange={uploadImage} className="w-full sm:w-[90%]" />
        <div className="w-1/4 sm:w-1/6 mx-auto">
          <img
            src={inputField.profilePic}
            className="w-full h-full rounded-full"
            alt="Profile"
          />
        </div>

        {/* Submit Button */}
        <div
          className="p-3 w-full sm:w-28 mt-5 text-lg text-center bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-black hover:text-white"
          onClick={handleRegister}
        >
          Register
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddMem;

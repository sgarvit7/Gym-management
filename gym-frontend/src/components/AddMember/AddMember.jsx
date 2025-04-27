import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddMember = ({ handleClose }) => {
  const [inputField, setInputField] = useState({ months: "", price: "" });
  const [memberships, setMembership] = useState([]);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
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
      setMembership(res.data.Membership || []);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleAddMembership = async () => {
    try {
      const response = await axios.post(
        "https://gym-management-m4b9.onrender.com/pack/addMembership",
        {
          data: {
            months: inputField.months,
            price: inputField.price,
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
      handleClose();
      setInputField({ months: "", price: "" }); // Clear inputs after adding
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  return (
    <div className="text-black p-4">
      {/* Membership Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-center justify-center">
        {memberships.length > 0 ? (
          memberships.map((item, index) => (
            <div
              key={index}
              className="text-lg bg-slate-900 text-white border-2 p-4 flex flex-col items-center justify-center gap-2 rounded-xl font-semibold hover:bg-white hover:text-black transition-all"
            >
              <div>{item.month} months membership</div>
              <div>₹ {item.price}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 col-span-full text-center">No memberships found.</div>
        )}
      </div>

      <hr className="mt-10 mb-10" />

      {/* Add Membership Section */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
        <input
          className="border-2 rounded-lg text-m w-72 p-2"
          type="number"
          value={inputField.months}
          onChange={(event) => handleOnChange(event, "months")}
          placeholder="Add No. of Months"
        />
        <input
          className="border-2 rounded-lg text-m w-72 p-2"
          type="number"
          value={inputField.price}
          onChange={(event) => handleOnChange(event, "price")}
          placeholder="Add Price"
        />
        <div
          onClick={handleAddMembership}
          className="text-lg border-2 p-2 w-36 text-center rounded-xl cursor-pointer hover:bg-black hover:text-white transition-all font-semibold"
        >
          Add +
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddMember;

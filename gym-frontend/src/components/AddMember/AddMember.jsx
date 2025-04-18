import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddMember = ({handleClose}) => {
  const [inputField, setInputField] = useState({ months: "", price: "" });
  const [memberships, setMembership] = useState({});

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const fetchMembership = async () => {
    try {
      const res = await axios.get("http://localhost:4000/pack/getMembership", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });

      toast.success(res.data.message);
      setMembership(res.data.Membership);
    } catch (err) {
      console.log(err);
      toast.error(res.data.err);
    }
  };

  const handleAddMembership = async ()=>{
   
    try {
        const response = await axios.post(
          "http://localhost:4000/pack/addMembership",
          {
            data:{
            months: inputField.months,
            price: inputField.price,
          }
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
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error(err.message);
        }
      }
  

}

  useEffect(() => {
    fetchMembership();
  }, []);

  return (
    <div className="text-black">
      <div className="flex flex-wrap gap-5 items-center justify-center">
        {Array.isArray(memberships) &&
          memberships.map((item, index) => {
            return (
              <div className="text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:bg-white hover:text-black">
                <div>{item.month} months membership</div>
                <div>rs {item.price}</div>
              </div>
            );
          })}
        {/* block for membership details */}
      </div>
      <hr className="mt-10 mb-10" />
      <div className="flex gap-10 mb-10">
        <input
          className="border-2 rounded-lg text-m w-1/3 h-1/2 p-2"
          type="number"
          value={inputField.months}
          onChange={(event) => {
            handleOnChange(event, "months");
          }}
          placeholder="Add No. of Months"
        />
        <input
          className="border-2 rounded-lg text-m w-1/3 h-1/2 p-2"
          type="number"
          value={inputField.price}
          onChange={(event) => {
            handleOnChange(event, "price");
          }}
          placeholder="Add Price"
        />
        <div 
            onClick={handleAddMembership}
        className="text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-black hover:text-white">
          Add+
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default AddMember;

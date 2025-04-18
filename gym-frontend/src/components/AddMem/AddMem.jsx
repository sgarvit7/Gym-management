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
//   const [imageLoader, setImageLoader] = useState(false);

  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
   
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    // dvacsvlec
    data.append("upload_preset", "gym-management");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dvacsvlec/image/upload",
        data
      );
      const imageUrl = response.data.url;
      inputField.profilePic = imageUrl;
    } catch (err) {
      console.log(err);
    }
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
      setMembershipList(res.data.Membership);
      if(res.data.Membership.length==0){
        return toast.error("No Membership added yet,",{
            className:"text-lg"
        })

      }
      else{
        let a  = res.data.Membership[0]._id
        setSelectedOption(a);
        setInputField({...inputField,membership:a});
      }
         } 
         
       catch (err) {
      console.log(err);
      toast.error(res.data.err);
    }
  };
 
     useEffect(() => {
    fetchMembership();
  }, []);

    const handleOnChangeSelect = (event)=>{
        let value  = event.target.value;
        setSelectedOption(value);
        setInputField({...inputField,membership:value})
    };

     const handleRegister = async ()=>{
       
          try {
            
            const response = await axios.post("http://localhost:4000/member/registerMember",{
              data:{
                name : inputField.name,
                address : inputField.address,
                profilePic : inputField.profilePic,
                mobileNo: inputField.mobileNo,
                joiningDate : inputField.joiningDate,
                membership : selectedOption
              }},{
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                withCredentials: true,
              }
            );
            toast.success(response.data.message)
          } catch (err) {
            if (err.response) {
              // The server responded with a status other than 2xx
              toast.error( err.response.data.message);
            } else {
              // Some other error (e.g., network error)
              toast.error( err.message);
            }
          }
      }

  return (
    <div className="text-black">
      <div className="grid gap-5 grid-cols-2 text-lg">
      <input
        type="text"
        value={inputField.name} 
        onChange={(event) => {handleOnChange(event, "name") }}
        className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        placeholder="Name"
      />
        <input
        type="text"
        value={inputField.mobileNo} 
        onChange={(event) => {handleOnChange(event, "mobileNo") }}
        className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        placeholder="Mobile No."
      />
      <input
      type="text"
      value={inputField.address} 
      onChange={(event) => {handleOnChange(event, "address") }}
      className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
      placeholder="Address"
    />
       <input
        type="date"
        value={inputField.joiningDate} 
        onChange={(event) => {handleOnChange(event, "joiningDate") }}
        className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12"
        // placeholder="Name"
      />
        <select value={selectedOption} onChange={handleOnChangeSelect} className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray">
          {
            membershipList.map((item,index)=>{
                return(
                    <option key={index} value={item._id}>{item.month} Months Membership</option>
                );
            })
          }
        </select>
        <input type="file"
        onChange={(e)=>{uploadImage(e)}}
        />
        <div className="w-1/4">
          <img
            src={inputField.profilePic}
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="p-3 border-2 mt-5 w-28 text-lg h-14 text-center mx-auto bg-slate-900 text-white rounded-xl cursor-pointer hover:bg-black hover:text-white" onClick={handleRegister}>
          Register
        </div>
      </div>
    <ToastContainer/>
    </div>

  );
};
export default AddMem;

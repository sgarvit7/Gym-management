import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const MemberDetail = () => {
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({
    membership: "",
  });

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [Status, setStatus] = useState("false");
  const [selectedOption, setSelectedOption] = useState("");
  const [memberships, setMembership] = useState({});
  const handleSwitchbtn = () => {
    let status = Status === "Active" ? "Pending" : "Active";
    setStatus(status);
  };
  const [renew, setRenew] = useState(false);
  const handleRenew = () => {
    setRenew((prev) => !prev);
  };

  const fetchData = async () => {
    try {
      console.log(id);
      const res = await axios.get(
        `https://gym-management-m4b9.onrender.com/member/memberDetails/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      toast.success("data fetched");
      console.log(res);
      setData(res.data.Member);
      setStatus(res.data.Member.status);
    } catch (err) {
      console.log(err);
      toast.error(res);
    }
  };
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
      setMembership(res.data.Membership);
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
    fetchData();
  }, [id]);
  useEffect(() => {
    fetchMembership();
  }, []);

  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setSelectedOption(value);
    setInputField({ ...inputField, membership: value });
  };

  const isDateInPast = (inputDate) => {
    const today = new Date();
    const givenDate = new Date(inputDate);
    return givenDate < today;
  };

  const handlSavebtn = async () => {
    try {
      console.log(selectedOption);
      const response = await axios.put(
        `https://gym-management-m4b9.onrender.com/member/updateMembership/${id}`,
        {
           
            Memberships: selectedOption,
          
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
      if (err.response) {
        // The server responded with a status other than 2xx
        toast.error(err.response.data.message);
      } else {
        // Some other error (e.g., network error)
        toast.error(err.message);
      }
    }
  };

  return (
    <div className="w-3/4 text-black">
      <div className=" flex w-1/5  text-white rounded-lg p-3">
        <div
          onClick={() => {
            navigate(-1);
          }}
          className="border-2 bg-slate-900 pl-3 pr-3 pt-1 rounded-2xl flex cursor-pointer hover:bg-white  hover:text-black"
        >
          Go Back
        </div>
      </div>
      <div className="mt-10 p-2">
        <div className="w-[100%] h-fit flex">
          <div className="w-1/3 mx-auto">
            <img src={data.profilePic} className="w-full mx-auto" />
          </div>
          <div className="w-2/3 mt-5 text-xl p-5">
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Name : {data.name}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Mobile : {data.MobileNo}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Address : {data.address}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              joined date : {data.joininDate}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Next bill date : {data.nextBillDate}
            </div>
            <div className="mt-1 mb-2 text-2xl font-semibold">
              Status :{" "}
              <Switch
                onColor="#6366f1"
                checked={Status === "Active"}
                onChange={() => {
                  handleSwitchbtn();
                }}
              />{" "}
            </div>
            {isDateInPast(data.nextBillDate) && (
              <div
                onClick={() => {
                  handleRenew();
                }}
                className="mt-1 rounded-lg p-3 border-2 border-slate-900 text-center w-full md:w-1/2 cursor-pointer hover:text-white hover:bg-black"
              >
                Renew
              </div>
            )}
            {renew && (
              <div className="rounded-lg p-3 mt-5 mx-auto mb-5 h-fit bg-slate-50 md:w-[50%]">
                <div className="w-full">
                  <div className="my-5">Membership</div>
                  {/* <select className="w-full border-2 p-2 rounded-lg">
                   */}
                  <select
                    value={selectedOption}
                    onChange={handleOnChangeSelect}
                    className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray"
                  >
                    {memberships.map((item, index) => {
                      return (
                        <option key={index} value={item._id}>
                          {item.month} Months Membership
                        </option>
                      );
                    })}
                  </select>
                  <div
                    className="mt-3 rounded-lg p-1 border-2 border-slate-900 text-xl text-center w-1/3 h-[45px] mx-auto cursor-pointer hover:text-white hover:bg-black "
                    onClick={handlSavebtn}
                  >
                    Save
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemberDetail;

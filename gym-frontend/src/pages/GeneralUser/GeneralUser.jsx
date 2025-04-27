import { Link } from "react-router-dom";
import MemberCard from "../../components/MemberCard/MemberCard";
import { useEffect, useState } from "react";
import { expired, expiringSoon, inActive, monthlyJoined, threeDays } from "./data";
import { ToastContainer } from "react-toastify";

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const func = sessionStorage.getItem('func');
    functionCall(func);
  }, []);

  const functionCall = async (func) => {
    try {
      switch (func) {
        case "Monthly":
          const datas = await monthlyJoined();
          setData(datas);
          setHeader("Monthly joined members");
          break;
        case "3days":
          const datatd = await threeDays();
          setData(datatd);
          setHeader("Expiring in 3 days");
          break;
        case "expiringSoon":
          const dataes = await expiringSoon();
          setData(dataes);
          setHeader("Expiring Soon");
          break;
        case "Expired":
          const datae = await expired();
          setData(datae);
          setHeader("Expired");
          break;
        case "Inactive":
          const datain = await inActive();
          setData(datain);
          setHeader("Inactive");
          break;
        default:
          setHeader("Members");
          setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="text-black min-h-screen p-4 bg-white">
      {/* Top Banner */}
      <div className="border-2 bg-slate-900 flex flex-col sm:flex-row justify-between items-center w-full text-white rounded-lg p-3 gap-3">
        <Link
          to={'/Dashboard'}
          className="border-2 pl-4 pr-4 pt-2 pb-2 rounded-2xl flex items-center cursor-pointer hover:bg-white hover:text-black transition"
        >
          Back to Dashboard
        </Link>
      </div>

      {/* Header */}
      <div className="mt-6 ml-2 text-2xl font-semibold text-slate-800">
        {header}
      </div>

      {/* Cards Section */}
      <div className="bg-slate-100 p-5 mt-5 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
        {
          data.map((item, index) => (
            <MemberCard key={item._id || index} item={item} />
          ))
        }
      </div>

      <ToastContainer />
    </div>
  );
};

export default GeneralUser;

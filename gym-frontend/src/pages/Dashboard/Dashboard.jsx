import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const handleOnClickMenu =(value)=>{
    sessionStorage.setItem('func',value);
  }
  return (
    <div className="w-3/4 text-black p-5 relative ">
      <div className="w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center">
        <img src="jhghjghjhjghghggghgghghjgdhfghdghdghdghdghdghd" alt="image" />
      </div>
      <div className="mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x auto h-[80%]">
       {/* this is the card block 1 */}
        <Link to={'/Member'} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-black "></div>
          <div className="py-7 px-5 flex-col justify-center item-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            
            <div className="w-[80px] h-[80px]  ml-27">
              <img
                alt="gym pic "
                className="w-full h-full "
                src="https://static.vecteezy.com/system/resources/thumbnails/000/550/535/small_2x/user_icon_007.jpg"
              />
            </div>
            <p className="text-xl my-3 font-semibold font-mono">Joined Members</p>
          </div>
        </Link>
{/* card block 2 */}
 <Link to={'/Specific/Monthly'} onClick={()=>handleOnClickMenu("Monthly")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-black "></div>
          <div className="py-7 px-5 flex-col justify-center item-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            
            <div className="w-[80px] h-[80px]  ml-27">
              <img
                alt="gym pic "
                className="w-full h-full "
                src="https://img.pikbest.com/origin/09/41/95/68spIkbEsTFXr.png!sw800"
              />
            </div>
            <p className="text-xl my-3 font-semibold font-mono">Monthly Joined</p>
          </div>
        </Link>
{/* card block 3 */}
 <Link to={'/Specific/3days'} onClick={()=>handleOnClickMenu("3days")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-black "></div>
          <div className="py-7 px-5 flex-col justify-center item-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            
            <div className="w-[80px] h-[80px]  ml-27">
              <img
                alt="gym pic "
                className="w-full h-full "
                src="https://thumb.ac-illust.com/04/048a401a834610190b18436eaaef5e02_t.jpeg"
              />
            </div>
            <p className="text-xl my-3 font-semibold font-mono">Expiring in 3days</p>
          </div>
        </Link>
{/* card block 4 */}
 <Link to={'/Specific/expiringSoon'} onClick={()=>handleOnClickMenu("expiringSoon")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-black "></div>
          <div className="py-7 px-5 flex-col justify-center item-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            
            <div className="w-[80px] h-[80px]  ml-27">
              <img
                alt="gym pic "
                className="w-full h-full "
                src="https://thumbs.dreamstime.com/b/expiration-date-open-package-icon-jar-clock-thin-line-symbol-editable-stroke-vector-illustration-299122235.jpg"
              />
            </div>
            <p className="text-xl my-3 font-semibold font-mono">Expiring soon</p>
          </div>
        </Link>
{/* card block 5 */}
 <Link to={'/Specific/Expired'} onClick={()=>handleOnClickMenu("Expired")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-black "></div>
          <div className="py-7 px-5 flex-col justify-center item-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            
            <div className="w-[80px] h-[80px]  ml-27">
              <img
                alt="gym pic "
                className="w-full h-full "
                src="https://static.thenounproject.com/png/1241402-200.png"
              />
            </div>
            <p className="text-xl my-3 font-semibold font-mono">Expired</p>
          </div>
        </Link>
{/* card block 6 */}
 <Link to={'/Specific/Inactive'} onClick={()=>handleOnClickMenu("Inactive")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
          <div className="h-3 rounded-t-lg bg-black "></div>
          <div className="py-7 px-5 flex-col justify-center item-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
            <div className="w-[80px] h-[80px]  ml-27">
              <img
                alt="gym pic "
                className="w-full h-full "
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmE3nYQ2u85PjWZaWTscPZUPUnq2nJEkh79w&s"
              />
            </div>
            <p className="text-xl my-3 font-semibold font-mono">Inactive</p>
          </div>
        </Link>

        {/* lower banner */}
        <div className="md:bottom-4 p-4 w-3/4 mb-4 md:mb-0 absolute bg-black text-white mt-20 rounded-xl text-xl">
                Contact Developer for any Technical Error at +91-8459793550
        </div>

      </div>
    </div>
  );
};
export default Dashboard;

import React,{useState , useEffect} from "react";
import { use } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Sidebar = () => {

const location = useLocation();

  const [greeting,setGreeting] = useState("");
  const greetingMessage =()=>{
        const time = new Date().getHours();
        if(time <12){
            setGreeting("Good Morning ☕");
        }else if(time <18){
            setGreeting("Good Afternoon ☀");
        }else if(time<21){
            setGreeting("good evening 🌆");
        }else{
            setGreeting("good night 🌙");
        }
  }
  
    useEffect(()=>{
        greetingMessage()
    },[])
  
  
    return (
    <div className="w-1/4 h-[100vh] border-2 bg-black text-white p-5">
      <div className=" text-center text-3xl font-extralight p-5">
        {localStorage.getItem('gymName')};
      </div>
      <div className="flex gap-5 my-5">
        <div className="w-[100px] h-[100px] rounded-lg">
          <img
            alt="gym pic "
            className="w-full h-full rounded-full"
            src={localStorage.getItem('gymPic')}
          />
        </div>
        <div>
          <div className="text-xl">{greeting}</div>
          <div className="text-xl font-semibold mt-2">admin</div>
        </div>
      </div>

      <div className="mt-10 py-10 border-t-2 border-gray-700">

        <Link to={'/Dashboard'} className="flex gap-4 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-slate-300 hover:text-black">
          <div className="w-[30px] h-[30px] rounded-lg">
            <img
              alt="gym pic "
              className="w-full h-full rounded-full"
              src="https://w7.pngwing.com/pngs/848/762/png-transparent-computer-icons-home-house-home-angle-building-rectangle-thumbnail.png"
            />
          </div>
          <div>Dashboard</div>
          </Link>        
        <Link to={'/Member'} className="flex gap-4 mt-5 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-slate-300 hover:text-black">
          <div className="w-[30px] h-[30px] rounded-lg">
            <img
              alt="gym pic "
              className="w-full h-full rounded-full"
              src="https://static.vecteezy.com/system/resources/thumbnails/000/550/535/small/user_icon_007.jpg"
            />
          </div>
          <div>Members</div>
        </Link>
        
        <div className="flex gap-4  mt-5 font-semibold text-xl bg-slate-800 p-3 rounded-xl cursor-pointer hover:bg-slate-300 hover:text-black">
          <div className="w-[30px] h-[30px] rounded-lg">
            <img
              alt="gym pic "
              className="w-full h-full rounded-full"
              src="https://thumb.ac-illust.com/8a/8ad859c65a6967da3ee58835e37fade3_t.jpeg"
            />
          </div>
          <div>Logout</div>
        </div>
        

      </div>
    </div>
  );
};
export default Sidebar;

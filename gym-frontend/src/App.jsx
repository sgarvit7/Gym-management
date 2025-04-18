
import './App.css'
import Member from './pages/Member/Member.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Home from './pages/Home/Home.jsx'
import {Routes,Route,useNavigate} from "react-router-dom";
import { useState,useEffect } from 'react';
import GeneralUser from './pages/GeneralUser/GeneralUser.jsx';
import MemberDetail from './pages/MemberDetail/MemberDetail.jsx';
import 'react-toastify/dist/ReactToastify.css';
function App() {
const navigate = useNavigate();

  const[isLogin,setLogin] = useState(false);
useEffect(()=>{
      let isLogin = sessionStorage.getItem("isLogin");
      if(isLogin){
        setLogin(true);
        // navigate('/Dashboard');
      }
},[])
  return (
      <div className='flex' >
      {/* <Sidebar/> */}
        <Routes>  
          <Route path='/' element={<Home/>}/>
          <Route path='/Dashboard' element={<div className='flex w-full '> <Sidebar/> <Dashboard/>  </div>}/>
          <Route path='/Member' element={<div className='flex w-full '> <Sidebar/> <Member/>  </div>}/>
          <Route path='/Specific/:page' element={<div  className='flex w-full '><Sidebar/> <GeneralUser/></div>}/>
          <Route path='/member/:id' element={<div  className='flex w-full '><Sidebar/> <MemberDetail/></div>}/>
        </Routes>
     
      </div>
    
  )
}

export default App

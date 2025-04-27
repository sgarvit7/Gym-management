import './App.css';
import Member from './pages/Member/Member.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Home from './pages/Home/Home.jsx';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import GeneralUser from './pages/GeneralUser/GeneralUser.jsx';
import MemberDetail from './pages/MemberDetail/MemberDetail.jsx';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLogin, setLogin] = useState(false);
  useEffect(() => {
    let isLogin = sessionStorage.getItem('isLogin');
    if (isLogin) {
      setLogin(true);
      // navigate('/Dashboard');
    }
  }, []);

  // Hide sidebar on these routes
  const hideSidebarRoutes = ['/'];
  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex w-full">
      {/* Sidebar: Conditionally rendered */}
      {!shouldHideSidebar && (
        <div className="hidden md:block w-1/4 bg-gray-800">
          <Sidebar />
        </div>
      )}

      {/* Main Content: Adjust width based on sidebar visibility */}
      <div className={shouldHideSidebar ? 'w-full p-5' : 'w-full md:w-3/4 p-5'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Member" element={<Member />} />
          <Route path="/Specific/:page" element={<GeneralUser />} />
          <Route path="/member/:id" element={<MemberDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [greeting, setGreeting] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good Morning ☕");
    else if (h < 18) setGreeting("Good Afternoon ☀");
    else if (h < 21) setGreeting("Good Evening 🌆");
    else setGreeting("Good Night 🌙");
  }, []);

  const links = [
    { name: "Dashboard", path: "/Dashboard", icon: "🏠" },
    { name: "Members", path: "/Member", icon: "👥" },
    { name: "Logout", path: "/Logout", icon: "🔒" },
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 bg-black text-white rounded"
        onClick={() => setOpen(o => !o)}
      >
        {open ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-20 transform w-full
          bg-black text-white p-6 w-64 md:static md:translate-x-0
          h-full md:h-screen transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="text-center text-2xl font-light mb-8">
          {localStorage.getItem("gymName") || "gym2"}
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-4 mb-10">
          <img
            src={localStorage.getItem("gymPic") || "/assets/profile-placeholder.png"}
            alt="profile"
            className="w-20 h-20 rounded-full border-2 border-gray-700"
          />
          <div>
            <p className="text-lg">{greeting}</p>
            <p className="text-xl font-semibold">admin</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-4">
          {links.map(({ name, path, icon }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                className={`
                  flex items-center px-4 py-3 rounded-lg text-lg font-medium
                  transition-colors
                  ${active
                    ? "bg-slate-700 text-white"
                    : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"}
                `}
              >
                <span className="text-2xl">{icon}</span>
                <span className="ml-3">{name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;

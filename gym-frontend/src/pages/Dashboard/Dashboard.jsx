import React from "react";
import { Link } from "react-router-dom";

const cards = [
  {
    title: "Joined Members",
    img: "https://static.vecteezy.com/system/resources/thumbnails/000/550/535/small_2x/user_icon_007.jpg",
    path: "/Member",
    key: "Joined",
  },
  {
    title: "Monthly Joined",
    img: "https://img.pikbest.com/origin/09/41/95/68spIkbEsTFXr.png!sw800",
    path: "/Specific/Monthly",
    key: "Monthly",
  },
  {
    title: "Expiring in 3days",
    img: "https://thumb.ac-illust.com/04/048a401a834610190b18436eaaef5e02_t.jpeg",
    path: "/Specific/3days",
    key: "3days",
  },
  {
    title: "Expiring soon",
    img: "https://thumbs.dreamstime.com/b/expiration-date-open-package-icon-jar-clock-thin-line-symbol-editable-stroke-vector-illustration-299122235.jpg",
    path: "/Specific/expiringSoon",
    key: "expiringSoon",
  },
  {
    title: "Expired",
    img: "https://static.thenounproject.com/png/1241402-200.png",
    path: "/Specific/Expired",
    key: "Expired",
  },
  {
    title: "Inactive",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmE3nYQ2u85PjWZaWTscPZUPUnq2nJEkh79w&s",
    path: "/Specific/Inactive",
    key: "Inactive",
  },
];

const Dashboard = () => {
  const handleOnClickMenu = (value) => {
    sessionStorage.setItem("func", value);
  };

  return (
    <div className="flex flex-col min-h-screen p-6 bg-slate-100">
      {/* Header */}
      <header className="bg-slate-900 text-white rounded-lg p-4 flex items-center justify-between">
        <img
          src="/assets/logo.png"
          alt="Logo"
          className="h-12 object-contain"
        />
        <h1 className="text-2xl font-bold">Gym Dashboard</h1>
      </header>

      {/* Cards Grid */}
      <section className="flex-1 mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.key}
            to={card.path}
            onClick={() => handleOnClickMenu(card.key)}
            className="border rounded-xl overflow-hidden bg-white shadow-md
                       hover:shadow-xl hover:bg-white/90 transition"
          >
            {/* Thin top stripe */}
            <div className="h-1 bg-black" />

            {/* Card Content */}
            <div className="p-6 flex flex-col items-center text-center">
              <img
                src={card.img}
                alt={card.title}
                className="w-24 h-24 object-contain mb-4"
              />
              <p className="font-mono font-semibold text-xl">
                {card.title}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-6 p-4 bg-black text-white text-center rounded-lg text-sm sm:text-base">
        Contact Developer for any Technical Error at +91‑8459793550
      </footer>
    </div>
  );
};

export default Dashboard;

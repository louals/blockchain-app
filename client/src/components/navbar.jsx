import React from "react";
import { NavLink } from "react-router-dom";
// Icons updated for better semantic accuracy
import { 
  HiOutlineHome, 
  HiArrowCircleRight, 
  HiOutlineViewGrid,  
} from "react-icons/hi";
import logo from "/images/favicon.png"

const NavBar = () => {
  const navLinks = [
    { name: "Home", icon: <HiOutlineHome />, path: "/" },
    { name: "Send", icon: <HiArrowCircleRight />, path: "/send" },
    { name: "Transactions", icon: <HiOutlineViewGrid />, path: "/transactions" },
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
      <nav className="flex flex-col items-center gap-6 p-4 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl shadow-blue-500/10 transition-all duration-300">
        
        {/* Ethereum Logo / Home Link */}
        <NavLink to="/" className="w-12 h-12 rounded-2xl flex items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer">
          <img src={logo} alt="logo"/>
        </NavLink>

        {/* Vertical Divider */}
        <div className="w-8 h-[1px] bg-white/10" />

        {/* Navigation Items */}
        <ul className="flex flex-col items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) => `
                group relative flex items-center justify-center p-3 cursor-pointer transition-all
                ${isActive ? "text-[#757cd2] scale-110" : "text-gray-500 hover:text-white"}
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Active Indicator (Glow Line on the right) */}
                  {isActive && (
                    <div className="absolute -right-4 w-1 h-6 bg-[#757cd2] rounded-l-full shadow-[0_0_10px_#757cd2]" />
                  )}

                  <span className="text-2xl">
                    {link.icon}
                  </span>

                  {/* Tooltip (Appears to the Left) */}
                  <span className="absolute right-16 px-3 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none shadow-xl">
                    {link.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </ul>

        <div className="w-8 h-[1px] bg-white/10" />
      </nav>
    </div>
  );
};

export default NavBar;
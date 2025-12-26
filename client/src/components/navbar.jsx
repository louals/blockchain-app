import React from "react";
import { NavLink } from "react-router-dom";
import { 
  HiOutlineHome, 
  HiArrowCircleRight, 
  HiOutlineViewGrid,  
} from "react-icons/hi";
import logo from "/images/favicon.png";

const NavBar = () => {
  const navLinks = [
    { name: "Home", icon: <HiOutlineHome size={24} />, path: "/" },
    { name: "Send", icon: <HiArrowCircleRight size={24} />, path: "/send" },
    { name: "History", icon: <HiOutlineViewGrid size={24} />, path: "/transactions" },
  ];

  return (
    /* Mobile: Fixed at bottom, full width 
       Desktop (md): Fixed at right side, centered vertically 
    */
    <header className="fixed bottom-0 md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2 w-full md:w-auto z-50 px-4 pb-4 md:p-0">
      <nav className="flex flex-row md:flex-col items-center justify-around md:justify-center gap-2 md:gap-6 p-3 md:p-4 rounded-2xl md:rounded-3xl border border-white/10 bg-black/40 md:bg-white/10 backdrop-blur-2xl shadow-2xl shadow-blue-500/10 transition-all duration-300">
        
        {/* Logo - Hidden on mobile to save space, visible on desktop */}
        <NavLink
          to="/"
          className="hidden md:flex w-12 h-12 rounded-2xl items-center justify-center text-white hover:scale-110 transition-transform cursor-pointer"
        >
          <img src={logo} alt="logo" className="w-8 h-8" />
        </NavLink>

        {/* Divider - Hidden on mobile */}
        <div className="hidden md:block w-8 h-[1px] bg-white/10" />

        {/* Navigation Links */}
        <ul className="flex flex-row md:flex-col items-center justify-between w-full md:w-auto gap-2 md:gap-6">
          {navLinks.map((link) => (
            <li key={link.name} className="relative group flex-1 md:flex-none">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-col md:flex-row items-center justify-center p-3 md:p-4 rounded-xl cursor-pointer transition-all ${
                    isActive 
                      ? "text-blue-400 bg-blue-500/10 md:bg-transparent md:scale-110" 
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {link.icon}
                {/* Text Label - Visible on mobile for clarity, hidden on desktop (using tooltips instead) */}
                <span className="text-[10px] md:hidden mt-1 font-medium">{link.name}</span>
              </NavLink>

              {/* Active Indicator - Right side on desktop, Bottom side on mobile */}
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "absolute md:-right-4 bottom-0 md:top-1/2 md:-translate-y-1/2 w-full md:w-1 h-[2px] md:h-6 bg-blue-400 rounded-t-full md:rounded-l-full shadow-[0_0_10px_#60a5fa]"
                    : ""
                }
              />

              {/* Tooltip - Desktop Only */}
              <span className="hidden md:block absolute right-16 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none shadow-xl">
                {link.name}
              </span>
            </li>
          ))}
        </ul>

        {/* Bottom Divider - Hidden on mobile */}
        <div className="hidden md:block w-8 h-[1px] bg-white/10" />
      </nav>
    </header>
  );
};

export default NavBar;
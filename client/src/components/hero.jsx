import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { SiEthereum } from "react-icons/si";
import { BsArrowRight, BsShieldCheck } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import video from "/hero.mp4"
// Helper to shorten wallet address
const shortenAddress = (address) => `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

const Hero = () => {
  const navigate = useNavigate();
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  const handleGetStarted = () => {
    if (currentAccount) {
      navigate("/send");
    } else {
      connectWallet();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute  w-full h-full object-cover"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 z-0" />

      <div className="relative z-10 flex flex-col mf:flex-row items-center justify-between h-full max-w-7xl mx-auto px-6 py-12">
        {/* Left Content */}
        <div className="flex flex-1 flex-col justify- items-start mt-52">
        

          <div className="flex flex-wrap gap-4 mt-10">
            <button
              onClick={handleGetStarted}
              className="flex items-center bg-[#2952e3] hover:bg-[#1e3bb3] text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg shadow-blue-500/20"
            >
              {currentAccount ? "Enter Dashboard" : "Connect Wallet"}
              <BsArrowRight className="ml-2 text-xl" />
            </button>
            
            <button
              onClick={() => navigate("/transactions")}
              className="px-10 py-4 rounded-full border border-gray-500 text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </button>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-6 mt-12 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <BsShieldCheck className="text-blue-400 text-lg" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <AiOutlineInfoCircle className="text-blue-400 text-lg" />
              <span>Blockchain</span>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default Hero;
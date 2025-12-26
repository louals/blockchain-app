import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TransactionContext } from "../context/TransactionContext";
import { BsArrowRight, BsShieldFillCheck } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";

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
    <div className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="flex flex-col items-start text-left max-w-3xl">
          
          {/* Main Content */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
          Ethereum <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Smart Transactions
            </span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">
          A hands-on exploration of how wallets, ETH transfers, and smart contracts 
            work together to create permanent, on-chain records.
          </p>

          {/* Action Area */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
            <button
              onClick={handleGetStarted}
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-xl shadow-blue-500/20 group"
            >
              {currentAccount ? "Enter Dashboard" : "Connect MetaMask"}
              <BsArrowRight className="ml-2 text-xl group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate("/transactions")}
              className="px-8 py-4 rounded-xl border border-white/30 bg-white/10 text-white font-semibold backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            >
              View Explorer
            </button>
          </div>

          {/* Educational Trust Badges */}
          <div className="flex flex-wrap justify-start items-center gap-10 border-t border-white/10 mt-12 pt-8 w-full">
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2 text-blue-400">
                <BsShieldFillCheck className="text-xl" />
                <span className="font-bold text-white uppercase tracking-wider text-sm">Non-Custodial</span>
              </div>
              <p className="text-xs text-gray-400">Your keys never leave MetaMask</p>
            </div>
            
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-center gap-2 text-purple-400">
                <AiOutlineInfoCircle className="text-xl" />
                <span className="font-bold text-white uppercase tracking-wider text-sm">Sepolia Testnet</span>
              </div>
              <p className="text-xs text-gray-400">Zero-risk simulated environment</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Hero;
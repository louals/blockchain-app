import React from "react";
import { FiAlertCircle, FiCheckCircle, FiDownload, FiExternalLink, FiInfo, FiX } from "react-icons/fi";

import { WalletMetamask } from '@web3icons/react';
import { AiFillCheckCircle } from "react-icons/ai";
const Popup = ({ message, onClose, type = 'error' }) => {
    if (!message) return null;
  
    const isMetaMaskMissing = message.toLowerCase().includes("metamask") || 
                             message.toLowerCase().includes("install");
  
    
  
    return (
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fadeIn"
        onClick={onClose}
      >
        {/* Video background effect */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-orange-500/10"></div>
          {/* Grid overlay like in Hero */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(41, 82, 227, 0.1) 1px, transparent 1px),
                linear-gradient(rgba(41, 82, 227, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>
  
        
        {/* Main Popup Container */}
        <div 
          className={`relative bg-gradient-to-br backdrop-blur-xl border-[0.1px] border-orange-500 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden `}
          onClick={e => e.stopPropagation()}
        >
          
  
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative">
                  {isMetaMaskMissing ? (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/30 flex items-center justify-center mr-4">
                      <WalletMetamask className="text-orange-400 text-2xl" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to--500/20 border border-blue-500/30 flex items-center justify-center mr-4">
                      {config.icon}
                    </div>
                  )}
                 
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">
                    {isMetaMaskMissing ? "MetaMask Required" : 
                     type === 'success' ? "Success!" :
                     type === 'info' ? "Information" : "Notice"}
                  </h3>
                  <p className="text-orange-500/70 text-sm">Arcane Blockchain</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <FiX className="text-xl" />
              </button>
            </div>
          </div>
  
          {/* Content */}
          <div className="p-6">
            <p className="text-gray-200 text-center mb-6 leading-relaxed">{message}</p>
  
            {isMetaMaskMissing && (
              <>
                
  
                {/* Download Button */}
                <a
                  href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mb-4"
                >
                  <button className="group w-full bg-orange-500 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                    <div className="flex items-center justify-center">
                      <FiDownload className="mr-3 text-xl" />
                      <span>Download MetaMask</span>
                      <FiExternalLink className="ml-3" />
                    </div>
                  </button>
                </a>
  

              </>
            )}
  
            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 border border-orange-500/10 hover:border-orange-500/50 bg-black/30 text-gray-300 hover:text-white py-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {isMetaMaskMissing ? "Maybe Later" : "Close"}
              </button>
              
              {isMetaMaskMissing && (
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <button className="w-full border border-orange-500/10 hover:border-orange-500/10 bg-orange-500/10 text-orange-500/90 hover:text-orange-800 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02]">
                    Visit Official Site
                  </button>
                </a>
              )}
            </div>
          </div>
  
          {/* Footer */}
          <div className="px-6 py-4 bg-black/20 border-t border-white/10">
            <p className="text-gray-500 text-xs text-center">
              By connecting, you agree to our Terms and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  
  export default Popup;
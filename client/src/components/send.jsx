import React, { useContext, useState } from "react"; // Added useState
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle, BsArrowRight, BsCheckCircle } from 'react-icons/bs'; // Added Check icon
import { TransactionContext } from "../context/TransactionContext";
import Loader from "./Loader";
import { shortenAddress } from "../../utils/shortenAddress";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-xl p-3 outline-none bg-white/5 text-[#fff] border border-[#aaa8cd]/20 text-sm focus:border-[#757cd2] placeholder:text-white transition-all"
  />
);

const Send = () => {
  const { connectWallet, currentAccount, formData,setFormData, sendTransaction, handleChange, isLoading } = useContext(TransactionContext);
  
  // Local state for success notification
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    const { addressTo, amount, keyword, message } = formData;
    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    try {
      await sendTransaction();
      
      // If the transaction finishes successfully:
      setSuccess(true);

      if (setFormData) {
        setFormData({
          addressTo: "",
          amount: "",
          keyword: "",
          message: "",
        });
      }
      
      // Remove the success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
      
    } catch (error) {
      console.log("Transaction failed", error);
    }
  };

  return (
    <div className="flex w-full justify-center items-center gradient-bg-welcome min-h-screen font-sans">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4 max-w-7xl mx-auto w-full">
        
        {/* LEFT SECTION */}
        <div className="flex flex-1 justify-start flex-col mf:mr-20">
          <h1 className="text-6xl sm:text-8xl text-[#757cd2] font-bold tracking-tighter mb-6 leading-[1.1]">
            Ethereum
          </h1>
          
          <div className="p-6 justify-between items-start flex-col rounded-3xl h-52 sm:w-80 w-full my-5 eth-card transition-all hover:scale-105 duration-500 shadow-2xl">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl border border-white/20 flex justify-center items-center bg-white/10">
                  <SiEthereum fontSize={21} color="#e0d7e1" />
                </div>
                <BsInfoCircle fontSize={17} color="#e0d7e1" />
              </div>
              <div>
                <p className="text-[#aaa8cd] font-medium text-xs tracking-widest uppercase">
                  {currentAccount ? shortenAddress(currentAccount) : "No Wallet Connected"}
                </p>
                <p className="text-white font-bold text-xl mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>

          {!currentAccount && (
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={connectWallet}
                className="flex flex-row justify-center items-center bg-[#354bd5] px-8 py-3 rounded-full cursor-pointer hover:bg-[#2117c0] transition-all"
              >
                <p className="text-white text-base font-semibold">Connect Wallet</p>
                <BsArrowRight className="text-white ml-2" />
              </button>
            </div>
          )}
        </div>

        {/* RIGHT SECTION: The Transfer Form */}
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-8 sm:w-[450px] w-full flex flex-col justify-start items-center bg-white/5 backdrop-blur-xl border border-[#aaa8cd]/20 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            
            {/* SUCCESS MESSAGE OVERLAY */}
            {success && (
              <div className="absolute inset-0 z-10 bg-[#757cd2]/90 backdrop-blur-md flex flex-col justify-center items-center text-white animate-in fade-in duration-500">
                <BsCheckCircle fontSize={50} className="mb-4 text-white" />
                <h3 className="text-2xl font-bold">Transaction Sent!</h3>
                <p className="text-sm opacity-90 mt-2">Check your wallet for confirmation.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-xs uppercase tracking-widest border border-white/30 px-4 py-2 rounded-lg hover:bg-white/10"
                >
                  Dismiss
                </button>
              </div>
            )}

            <div className="w-full flex justify-between items-center mb-8">
               <h3 className="text-[#fff] text-2xl font-bold tracking-tight">Send Crypto</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="w-full space-y-2">
              <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} value={formData.addressTo} />
              <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} value={formData.amount} />
              <Input placeholder="Keyword (GIF)" name="keyword" type="text" handleChange={handleChange} value={formData.keyword} />
              <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} value={formData.message} />

              <div className="h-[1px] w-full bg-[#aaa8cd]/20 my-6"></div>

              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type="submit"
                  disabled={!currentAccount}
                  className={`w-full p-4 rounded-2xl font-bold text-lg transition-all ${
                    !currentAccount 
                      ? 'bg-white/5 text-[#78717c] cursor-not-allowed' 
                      : 'bg-[#e0d7e1] text-[#2f203c] hover:bg-white active:scale-[0.98]'
                  }`}
                >
                  Send Now
                </button>
              )}
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Send;
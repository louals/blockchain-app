import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../../utils/shortenAddress";
import { SiEthereum } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";

const TransactionRow = ({ addressTo, addressFrom, timestamp, message, amount }) => {
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors group">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-900/10 rounded-full text-white">
            <SiEthereum size={14} />
          </div>
          <span className="text-gray-400 text-xs">{timestamp}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <a 
          href={`https://sepolia.etherscan.io/address/${addressFrom}`} 
          target="_blank" 
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          {shortenAddress(addressFrom)}
        </a>
      </td>
      <td className="px-6 py-4">
        <span className="bg-[#e0d7e1] text-gray-400 px-2 py-1 rounded text-[10px] border border-white/10">OUT</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <a 
          href={`https://sepolia.etherscan.io/address/${addressTo}`} 
          target="_blank" 
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          {shortenAddress(addressTo)}
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-medium text-white">
        {amount} ETH
      </td>
      <td className="px-6 py-4 max-w-[150px] truncate text-gray-500 italic text-sm">
        {message || "No message"}
      </td>
      
    </tr>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full min-h-screen justify-center items-start pt-24 px-4 sm:px-10 gradient-bg-transactions">
      <div className="w-full max-w-6xl flex flex-col">
        <div className="mb-10">
          <h2 className="text-gray-400 text-3xl font-bold">Transactions</h2>
          <p className="text-gray-400 mt-2">
            {currentAccount 
              ? `History of transactions for ${shortenAddress(currentAccount)}` 
              : "Connect your wallet to view your history"}
          </p>
        </div>

        <div className="bg-[#fff]/0 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Time</th>
                  <th className="px-6 py-4 font-semibold">From</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">To</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Note</th>
                  
                </tr>
              </thead>
              <tbody className="text-sm">
                {[...transactions].reverse().map((transaction, i) => (
                  <TransactionRow key={i} {...transaction} />
                ))}
              </tbody>
            </table>
            
            {transactions.length === 0 && (
              <div className="py-20 text-center text-gray-500">
                No transactions found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
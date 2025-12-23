import React, {useEffect, useState} from "react";
import {ethers} from 'ethers'

import { contractABI, contractAddress } from "../../utils/constants";
import { AiOutlineConsoleSql } from "react-icons/ai";
import Popup from "../components/popup";

export const TransactionContext = React.createContext();

const {ethereum} = window;

const getEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
  const signer = await provider.getSigner(); // ✅ must await
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({addressTo: '', amount:'' , keyword: '', message:''})
    const [isLoading, setIsLoading] = useState(false)
    const [transactions, setTransactions] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    

    const handleChange = (e, name) => {
        setFormData((prevState)=>({ ...prevState, [name]: e.target.value}))
    }
    const getAllTransactions = async () => {
        try {
          if(!ethereum) {
            setPopupMessage("Please install MetaMask!");
            setShowPopup(true);
            return;
            }
      
          const transactionContract = await getEthereumContract();
          const availableTransactions = await transactionContract.getAllTransactions();
      
          const structuredTransactions = availableTransactions.map(tx => ({
            addressFrom: tx[0],                    // sender
            addressTo: tx[1],                      // receiver
            amount: ethers.formatEther(tx[2]),     // convert from BigInt
            message: tx[3],
            timestamp: new Date(Number(tx[4]) * 1000).toLocaleString(),
            keyword: tx[5],
          }));
      
          console.log(availableTransactions);
          setTransactions(structuredTransactions)
      
          return structuredTransactions; // you can set this in state
        } catch (error) {
          console.log(error);
        }
      };
      
    

    const checkIfWalletIsConnected = async () => {
        try { 
          if(!ethereum) {
            setPopupMessage("Please install MetaMask!");
            setShowPopup(true);
            return;
            }

                const accounts = await ethereum.request({method: 'eth_accounts'})
            if (accounts.length){
                setCurrentAccount(accounts[0])
                getAllTransactions();
            }else{
                console.log('No account found')
            }
        } catch (error) {
            console.log(error)
            throw new Error("No Ethereum object.")
        }
    }

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = await getEthereumContract();
            const transactionCount = await transactionContract.getTransactionsCount();

            window.localStorage.setItem("transacationCount", transactionCount)
        } catch (error) {
          console.log(error);
          throw new Error("No Ethereum object.");
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) {
            setPopupMessage("Please install MetaMask!");
            setShowPopup(true);
            return;
            }
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})

            setCurrentAccount(accounts[0])
        } catch (error) {
          console.log(error);
          setPopupMessage("Something went wrong while connecting the wallet.");
          setShowPopup(true);
        }
    }


    const sendTransaction = async () => {
        try {
          if (!ethereum) {
            setPopupMessage("Please install MetaMask!");
            setShowPopup(true);
            return;
          }
      
          const { addressTo, amount, keyword, message } = formData;
          const parsedAmount = ethers.parseEther(amount);
      
          // Send ETH transaction
          await ethereum.request({
            method: "eth_sendTransaction",
            params: [{
              from: currentAccount,
              to: addressTo,
              gas: "0x5208", // 21000
              value: parsedAmount._hex,
            }]
          });
      
          // Store in blockchain via contract
          const transactionContract = await getEthereumContract();
          setIsLoading(true);
          const transactionHash = await transactionContract.addToBlockChain(addressTo, parsedAmount, message, keyword);
          console.log("Loading", transactionHash.hash);
          await transactionHash.wait();
          setIsLoading(false);
          console.log("Success", transactionHash.hash);
      
          const transactionCount = await transactionContract.getTransactionsCount();
          setTransactionCount(Number(transactionCount));
        } catch (error) {
          console.log(error);
          throw new Error("No Ethereum object.");
        }
      };
      

    useEffect(()=> {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    },[])



    return (
        <TransactionContext.Provider value={{connectWallet,sendTransaction,transactions, currentAccount, formData, setFormData, handleChange, isLoading}}>
            {children}
            {showPopup && <Popup message={popupMessage} onClose={() => setShowPopup(false)} />}
        </TransactionContext.Provider>
    )}
// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.20;

contract Transactions {
    uint256 transactionCount;

    event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp, string keyword);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 times;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockChain(address payable receiver, uint amount, string memory message, string memory keyword) public {
        transactionCount += 1;
        // Adding the transaction to the list of transactions 

        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, keyword));
        // Emitting the event , making the transfer of the amount 
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword); 

    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions; 
    }

    function getTransactionsCount() public view returns (uint256){
        return transactionCount;
    }
}
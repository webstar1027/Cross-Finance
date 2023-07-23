const Web3 = require('web3');
require('dotenv').config();
const fs = require("fs")
// "Web3.providers.givenProvider" will be set if in an Ethereum supported browser.
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
let Contract = require('web3-eth-contract');
// set provider for all later instances to use
Contract.setProvider('https://data-seed-prebsc-1-s1.binance.org:8545');
const contract_address = "0x0994B94996d40E6BD82fD8d9033D83E95C795E77";
const contract_abi =
    [{ "inputs": [{ "internalType": "address", "name": "_controlCenter", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, {
        "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": true, "internalType": "bool", "name": "status", "type": "bool" }]
        , "name": "OperatorUpdated", "type": "event"
    }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "referrer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "commission", "type": "uint256" }], "name": "ReferralCommissionRecorded", "type": "event" }, {
        "anonymous": false, "inputs":
            [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "referrer", "type": "address" }], "name": "ReferralRecorded", "type": "event"
    }, {
        "inputs": [{
            "components": [{ "internalType": "address", "name": "referrer", "type": "address" }, { "internalType": "address", "name": "user", "type": "address" }],
            "internalType": "struct CrssReferral.ReferralObject[]", "name": "_objectArray", "type": "tuple[]"
        }], "name": "bulkRecordReferralFromOffchain", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, { "inputs": [], "name": "controlCenter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "countReferrals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view", "type": "function"
    }, { "inputs": [{ "internalType": "address", "name": "_referrer", "type": "address" }, { "internalType": "uint256", "name": "_debit", "type": "uint256" }], "name": "debitOutstandingCommission", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, {
        "inputs": [{ "internalType": "address", "name": "_referrer", "type": "address" }], "name": "getOutstandingCommission", "outputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }],
        "stateMutability": "view", "type": "function"
    }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "getReferrer", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "outstandingCommissions", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
    }, { "inputs": [], "name": "payer", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, {
        "inputs": [{ "internalType": "address", "name": "_user", "type": "address" },
        { "internalType": "address", "name": "_referrer", "type": "address" }], "name": "recordReferral", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{ "internalType": "address", "name": "_referrer", "type": "address" }, { "internalType": "uint256", "name": "_commission", "type": "uint256" }],
        "name": "recordReferralCommission", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "referrers", "outputs":
            [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function"
    }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "totalReferralCommissions", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_newPayer", "type": "address" }], "name": "updateOperator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
//this will make a function call to deployed referrer contract
const callReferralContract = async (objectJson) => {
    //await web3.eth.accounts.wallet.add('0xd3e8cdf7f53d34d1a6766ca3d1d73c595560fcf2b8078a812c742f955fce7cc4')
  
    var contract = await new Contract(contract_abi, contract_address);
    const encoded = contract.methods.bulkRecordReferralFromOffchain(objectJson).encodeABI()
    var tx = {
        gas: 10000000,
        to: contract_address,//process.env.REFERAL_ADDRESS,
        data: encoded
    }
    await web3.eth.accounts.signTransaction(tx, process.env.REFERAL_PRIVATE_KEY).then(signed => {
        web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log)
    })
}
//this is the script which should get triggered when a user that entered our site through someones referral link connects his/her wallet within 14 days of entering the site or however long we plan to save the user's cookies
function addReferral(userAddr, referrerAddr) {
      //this {address,address} object array holds all the referred addresses waiting to be registered on the blockchain with their respective referer address
    //this gets cleaned out after each succesful batch call 
    let currentDB = require("./currentDB.json");
    //here we can save all addresses that were already referred, in a simple address array for optimization purposes (unless there is a special need to also store the referrer for each address)
    //this should be permanent storage and would be ideal if we can back this up to ensure we never lose this DB
    //let savedDB = require("./savedDB.json");
    //if user is not already referred check to see if the user is already in the currentDB, if not add it to currentDB
    if (isNotReferred()) {
        addressExists = false;
        for (let i = 0; i < currentDB.length; i++) {
            if (currentDB[i].user == userAddr) {
                addressExists = true;
            }
        }
        if (addressExists == false) {
            currentDB.push({ "referrer": userAddr, "user": referrerAddr });
        }
        //if the length of the currentDB exceeds the maximum allowed length (which has to exist if we want to avoid "out of gas" errors) or enough time passed for the time scheduled recording of referrals, send the call to Referral smart contract
        //this should only be able to get called by a designated payer wallet address which needs to contain enough gas to execute the function calls 
        if (currentDB.length >= 50) {
            //call referral smart contract
            callReferralContract(currentDB);
            //reset currentDB
            currentDB = []
            fs.writeFileSync("scripts/currentDB.json", JSON.stringify(currentDB))
        }
      }
    ​
}
const isNotReferred = async (addr) => {
    const contract = await new Contract(contract_abi, contract_address);
    const referred = contract.methods.getReferrer(addr).call();
    return referred == "0x0000000000000000000000000000000000000000" || undefined || null
}
//for testing purposes, used to artificially fill up the currentDB for further code execution
function addAddressesInBulk() {
    //these should be same length arrays
    const userArray = require("./userAddresses.json")
    const referrerArray = require("./referrerAddresses.json")
    let addressesToAdd = []
    for (let i = 0; i < userArray.length; i++) {
        addressesToAdd.push({ "referrer": userArray[i], "user": referrerArray[i] })
      }
    fs.writeFileSync("scripts/currentDB.json", JSON.stringify(addressesToAdd))
  }
//addAddressesInBulk()
addReferral("0xf137f3409657c4dbe297b26d7d1a3233a7272d32", "0x74885d1fcc291aab02c83767b98281f892e7ce9e",)
//FOR ALEX
//*addReferral is the function that needs to be initiated on your end
//*callReferralContract is not relevant to frontend side, just smart contract function calling
//*addAddressesInBulk also irrelevant, only for testing
//1. Make sure each referral link is associated in some way with the referrer address, because we will need it to execute the code
// Each referral link should already have it's own unique ID, so that might be a good starting point
//2. Freddy said we should save cookies of users who entered the site through referral link for 14 days, when a user whose cookies are saved
//connects his wallet, the frontend should send the following object to the addReferal() function => {referrer:"0x123...",user:"0x145.."}
//The code will then check if the user was already referred (savedDB), if true, then it checks if user was already added to the pending referral registration list (currentDB), if not
//the user address is added to currentDB with its respective referrer address
//When the max currentDB size is reached, or enough time has passed a designated registration wallet will send a function call to register user addresses contained in currentDB in bulk 
​




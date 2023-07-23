const { ethers } = require("ethers");
const { masterchef } = require("./config/address");
const abi = require("./config/masterchefAbi");
const config = require("./config")
require('dotenv').config(); // .env

async function fetchInterval() {
    // setTimeout(async () => {
      await processLogic();
    //   fetchInterval();
      // }, 86400000);
    // }, 10000);
  }

async function processLogic() {
    // const address = masterchef;
    // const rpcProvider = process.env.PRODUCTION === "production" ? config.rpcMainnet : config.rpcTestnet;
    // const provider = new ethers.providers.JsonRpcProvider(rpcProvider);
    // const owner = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    // const contract = new ethers.Contract(address, abi, owner);
    // const lastRound = await contract.lastPatrolRound();
    // const status = await contract.periodicPatrol();
    // console.log('round: ',lastRound);
    // console.log('status: ',status);
}

module.exports = fetchInterval;
  
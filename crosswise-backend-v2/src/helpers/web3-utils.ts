import IWeb3 from 'web3';
import { HTTP_RPC_URL } from './constants';
const Web3 = require('web3');
const web3: IWeb3 = new Web3(new Web3.providers.HttpProvider(HTTP_RPC_URL));

export default web3;

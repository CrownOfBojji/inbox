// deploy code will go here
// command: node deploy.js
const dotenv = require('dotenv');
const Web3 = require('web3');
const HDWallet = require('@truffle/hdwallet-provider');
const {interface, bytecode} = require('./compile');

dotenv.config();

const provider = new HDWallet(process.env.PHRASES, process.env.END_POINT);

const web3 = new Web3(provider);

const deploy = async ()=>{
  const accounts = await web3.eth.getAccounts();
  console.log('attempting to deploy from account:', accounts[0]);
  const contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode, arguments: ['Hi there']})
    .send({from: accounts[0], gas: '1000000'});

  console.log('contract deployed to:', contract.options.address);
  provider.engine.stop();
};
deploy();

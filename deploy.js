require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiled_contract = require('./compile');
const interface = compiled_contract.output.contracts['Inbox.sol']['Inbox'].abi;
const bytecode = compiled_contract.output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object;

const provider = new HDWalletProvider(
  process.env.METAMASK,
  'https://rinkeby.infura.io/v3/c9f18875b25d4c40aa0b79104fe9a920'
);
const web3 = new Web3(provider);

const deploy = async function(){
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account',accounts[0]);

  const result = await new web3.eth.Contract(interface)
    .deploy({data: bytecode, arguments: ['Hi Palak']})
    .send({from: accounts[0], gas: '1000000'});

  console.log('Contract deployed to',result.options.address);
  provider.engine.stop();
};

deploy();

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const compiled_contract = require('../compile');

const interface = compiled_contract.output.contracts['Inbox.sol']['Inbox'].abi;
const bytecode = compiled_contract.output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object;

let accounts;
let inbox;

beforeEach(async function(){

  accounts = await web3.eth.getAccounts();

  inbox = await new web3.eth.Contract(interface)
    .deploy({ data : bytecode, arguments: ['Hi there!']})
    .send({ from: accounts[0], gas: '1000000'});
});


describe('Inbox', function() {
  it('deploys a contract', async function() {
    assert.ok(inbox.options.address);
  });
});

//Testing git multi accounts.

/*describe('', function(){
  it('',async function() {

  });
});*/

'Use strict';
// require('dotenv').config();
// Sending ETH from account1 to account2
var Tx = require('ethereumjs-tx');
const tx = new Tx('txObject');
const Web3 = require('web3'); // Setting up Web3 connection
const web3 = new Web3('http://127.0.0.1:7545'); // Also use ropsten test network to avoid the gas costs

// Create account.
// console.log(web3.eth.accounts.create());
// console.log(web3.eth.accounts.create());

const account1 = '0x086A03Da368bDBC86ebab4cf70262D2471fF56d6';
const account2 = '0xcE98Cb3f36C8b7aB35D22579E4F199ea12FBb874';

// save your private keys to environment variable
const privateKey1 = process.env.PRIVATE_KEY_1; //Buffer.from helps convert to binary
const privateKey2 = process.env.PRIVATE_KEY_2;

// const privateKey2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex');

web3.eth.getBalance(account1, (err, result) => {
  console.log(result);
});
web3.eth.getBalance(account1, (err, bal) => {
  console.log('Account1 balance is:', web3.utils.fromWei(bal, 'ether'));
});
web3.eth.getBalance(account2, (err, bal) => {
  console.log('Account2 balance is:', web3.utils.fromWei(bal, 'ether'));
});
web3.eth.sendTransaction({
  from: account1,
  to: account2,
  value: web3.utils.toWei('1', 'ether'),
});

// web3.eth.personal.unlockAccount;

// Web3 to sign the transactions locally.

web3.eth.getTransactionCount(account1, (err, txCount) => {
  // Build a transaction

  const txObject = {
    nonce: web3.utils.toHex(txCount), //Transaction count to avoid double spending problem
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei('1', 'ether')), //
    gasLimit: web3.utils.toHex(21000), // sets a limit (Maximum amount of gas consumed by the transaction)
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')), // Cost of each unit of gas (amount we want to pay)
  };

  console.log(txObject);

  //  Sign the transaction
  const tx = new Tx(txObject);
  tx.sign(privateKey1);

  const serializedTransaction = tx.serialize();
  const raw = '0x' + serializedTransaction.toString('hex'); // we serialize the transaction and convert it to hexadecimal string so that it can be passed to web3

  // Broadcast the Transaction
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('txHash: ', txHash);
  });
});

const Web3 = require('web3');

// Initialize web3 with the correct provider (local node or Infura)
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.BLOCKCHAIN_URL));

// Check if the connection to the blockchain is successful
web3.eth.net.isListening()
  .then(() => {
    console.log('Web3 is connected to the blockchain!');
  })
  .catch((error) => {
    console.error('Error connecting to the blockchain:', error);
  });
  

module.exports = {
  web3,
  contract: new web3.eth.Contract(
    require('../build/contracts/ProductPassport.json').abi,

    process.env.CONTRACT_ADDRESS
  ),
};

# Transaction
Writing data to the blockchain and updating its state, can be done through: sending Ether from one account to another, calling a smart contract function that writes data, and deploying a smart contract to the blockchain.
Broadcasting transactions to the network, you need to sign them first. You can use (ethereumjs-tx) a JavaScript library. {npm install ethereumjs-tx} This helps to sign all of the transactions locally. Using a remote node hosted by Infura but we'll have to sign the transactions locally rather than giving the remote node manage our private keys.
This code creates the raw transaction, sign it, then send the transaction and broadcast it to the network.





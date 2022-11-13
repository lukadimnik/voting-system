const ethers = require('ethers');
const fs = require('fs-extra');

async function main() {
  // connect to ganache instance
  const provider = new ethers.providers.JsonRpcProvider(
    'HTTP://127.0.0.1:7545'
  );
  // connect to the wallet with the private key from an account on ganache
  const wallet = new ethers.Wallet(
    '9a87bdc4b8f39a1c438e32f1c01431527a38f2cbaf2ef400e10ae4b88f3e96d3',
    provider
  );
  const abi = fs.readFileSync(
    './compiled-contracts/contracts_SimleStorage_sol_SimpleStorage.abi',
    'utf-8'
  );
  const binary = fs.readFileSync(
    './compiled-contracts/contracts_SimleStorage_sol_SimpleStorage.bin',
    'utf-8'
  );
  // wallet will deploy the contract
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deploying, please wait...');
  const contract = await contractFactory.deploy();
  // wait one block to get the receipt
  await contract.deployTransaction.wait(1);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store('8');
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated Favorite Number: ${updatedFavoriteNumber.toString()}`);
}

main().then(() =>
  process.exit().catch((err) => {
    console.error(err);
    process.exit(1);
  })
);

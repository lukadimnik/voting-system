import { ethers } from 'ethers';
import * as fs from 'fs-extra';
import 'dotenv/config';

async function main() {
  // connect to ganache instance
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.GOERLI_RPC_URL
  );
  // connect to the wallet with the private key from an account on ganache
  const encryptedJson = fs.readFileSync('./.encryptedKey.json', 'utf8');
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  // let wallet = new ethers.Wallet.fromEncryptedJsonSync(
  //   encryptedJson,
  //   process.env.PRIVATE_KEY_PASSWORD
  // );
  // wallet = await wallet.connect(provider);
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
  console.log(`Deployed to contract address: ${contract.address}`);

  const currentFavoriteNumber = await contract.retrieve();
  console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);
  const transactionResponse = await contract.store('8');
  const transactionReceipt = await transactionResponse.wait(1);
  const updatedFavoriteNumber = await contract.retrieve();
  console.log(`Updated Favorite Number: ${updatedFavoriteNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

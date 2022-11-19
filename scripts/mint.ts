import { ethers, getNamedAccounts } from 'hardhat';
import { BasicNft } from '../typechain-types/contracts/BasicNFT.sol/BasicNft';

async function main() {
  const { deployer } = await getNamedAccounts();
  //   const basicNft: BasicNft = await ethers.getContract('BasicNft', deployer);
  const basicNft = await ethers.getContract('basicNft', deployer);

  console.log('Minting...');
  const transactionResponse = await basicNft.getTokenCounter();
  console.log('transactionResponse: ', transactionResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

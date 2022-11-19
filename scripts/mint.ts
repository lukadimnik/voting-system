import { ethers, getNamedAccounts } from 'hardhat';
import { BasicNft } from '../typechain-types/contracts/BasicNFT.sol/BasicNft';

async function main() {
  const { deployer } = await getNamedAccounts();
  const basicNft: BasicNft = await ethers.getContract('BasicNft', deployer);

  console.log('Minting...');
  const transactionRes = await basicNft.mintNft();
  await transactionRes.wait(1);
  console.log('transactionRes: ', transactionRes);

  const tokenCounterRes = await basicNft.getTokenCounter();
  console.log('transactionResponse: ', tokenCounterRes.toNumber());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

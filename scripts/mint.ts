import { ethers, getNamedAccounts } from 'hardhat';
import { BasicNft } from '../typechain-types/contracts/BasicNFT.sol/BasicNft';

async function main() {
  const { deployer } = await getNamedAccounts();
  const basicNft: BasicNft = await ethers.getContract('BasicNft', deployer);

  console.log('Minting...');
  const transactionRes = await basicNft.mintNft();
  console.log('------');
  await transactionRes.wait(1);
  console.log('transactionRes: ', transactionRes);

  const tokenCounterRes = await basicNft.getTokenCounter();
  console.log('transactionResponse: ', tokenCounterRes.toNumber());

  console.log('tokoen uri: ', await basicNft.tokenURI(0));
  console.log('tokoen uri: ', await basicNft.TOKEN_URI());
  console.log('owner of: ', await basicNft.ownerOf(0));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

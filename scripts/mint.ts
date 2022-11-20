import { ethers, getNamedAccounts } from 'hardhat';
import { BasicNft } from '../typechain-types/contracts/BasicNFT.sol/BasicNft';

async function main() {
  const { deployer, user1, user2, user3, user4 } = await getNamedAccounts();
  const basicNft: BasicNft = await ethers.getContract('BasicNft', deployer);

  console.log('Minting...');
  const transactionRes = await basicNft.mintNft();

  const basicNft1: BasicNft = await ethers.getContract('BasicNft', user1);
  await basicNft1.mintNft();
  const basicNft2: BasicNft = await ethers.getContract('BasicNft', user2);
  await basicNft2.mintNft();
  const basicNft3: BasicNft = await ethers.getContract('BasicNft', user3);
  await basicNft3.mintNft();
  const basicNft4: BasicNft = await ethers.getContract('BasicNft', user4);
  await basicNft4.mintNft();

  // console.log('------');
  // await transactionRes.wait(1);
  // console.log('transactionRes: ', transactionRes);

  // const tokenCounterRes = await basicNft.getTokenCounter();
  // console.log('transactionResponse: ', tokenCounterRes.toNumber());

  // console.log('tokoen uri: ', await basicNft.tokenURI(0));
  // console.log('tokoen uri: ', await basicNft.TOKEN_URI());
  // console.log('owner of: ', await basicNft.ownerOf(0));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

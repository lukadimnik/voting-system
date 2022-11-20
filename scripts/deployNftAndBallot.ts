import { ethers, run, network } from 'hardhat';
import {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from '../helper-hardhat-config';
import verify from '../utils/verify';

async function main() {
  // deploy nft contract
  console.log('Deploying basic nft...');

  const BasicNft = await ethers.getContractFactory('BasicNft');
  const basicNft = await BasicNft.deploy();
  await basicNft.deployed();
  const basicNftAddress = basicNft.address;
  console.log('Nft address is: ', basicNftAddress);
  const transactionRes = await basicNft.mintNft();

  // deploy ballot contract
  console.log('Deploying ballot contract...');
  const ballotArgs: any[] = [];

  const Ballot = await ethers.getContractFactory('Ballot');
  const ballot = await Ballot.deploy(basicNftAddress);
  await ballot.deployed();
  console.log('ballot address is: ', ballot.address);
  console.log('blah: ', await ballot.walletHoldsToken());

  console.log('network config: ', network.config);

  if (!developmentChains.includes(network.name)) {
    console.log('Verifying BasicNft contract...');
    await basicNft.deployTransaction.wait(2);
    await verify(basicNft.address, ballotArgs);

    console.log('Verifying Ballot contract...');
    await ballot.deployTransaction.wait(2);
    await verify(ballot.address, ballotArgs);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

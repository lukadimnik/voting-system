import { ethers, getNamedAccounts } from 'hardhat';
import { Ballot } from '../typechain-types/contracts/Ballot';
import { stringArrtoByte32Arr } from '../utils/toByte32';
import { bytesToString } from '../utils/parseBytes32';

async function main() {
  const { deployer, user1, user2, user3, user4 } = await getNamedAccounts();
  console.log('Voting script...');
  const ballot: Ballot = await ethers.getContract('Ballot', deployer);
  console.log('Wallet holds token: ', await ballot.walletHoldsToken());
  await ballot.giveRightToVote(user1);
  await ballot.giveRightToVote(user2);
  await ballot.giveRightToVote(user3);
  await ballot.giveRightToVote(user4);
  console.log('Deployer voting...');

  await ballot.vote(1);
  console.log('User1 voting...');

  const ballot1: Ballot = await ethers.getContract('Ballot', user1);
  await ballot1.vote(0);
  const ballot2: Ballot = await ethers.getContract('Ballot', user2);
  await ballot2.vote(0);
  const ballot3: Ballot = await ethers.getContract('Ballot', user3);
  await ballot3.vote(0);
  const ballot4: Ballot = await ethers.getContract('Ballot', user4);
  await ballot4.vote(0);

  const winnerName = await ballot.winnerName();

  console.log('🚀winnerName: ', await bytesToString(winnerName));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

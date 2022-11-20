import { ethers, getNamedAccounts } from 'hardhat';
import { Ballot } from '../typechain-types/contracts/Ballot';

async function main() {
  const { deployer } = await getNamedAccounts();
  console.log('Voting script...');
  const ballot: Ballot = await ethers.getContract('Ballot', deployer);
  console.log('Wallet holds token: ', await ballot.walletHoldsToken());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

import { ethers, getNamedAccounts } from 'hardhat';
import { Lock } from '../typechain-types/contracts/Lock';

async function main() {
  const { deployer } = await getNamedAccounts();
  const lock: Lock = await ethers.getContract('Lock', deployer);

  console.log('Withdrawing...');
  const transactionResponse = await lock.withdraw();
  await transactionResponse.wait(1);
  console.log('transactionResponse: ', transactionResponse);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

import { ethers, getNamedAccounts } from 'hardhat';
import { Lock } from '../typechain-types/contracts/Lock';

async function main() {
  const { deployer } = await getNamedAccounts();
  const lock: Lock = await ethers.getContract('Lock', deployer);

  console.log('Withdrawing...');
  const transactionResponse = await lock.withdraw();
  await transactionResponse.wait(1);
  console.log('transactionResponse: ', transactionResponse);
  //   const txRes = await lock.walletHoldsToken(
  //     '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  //     '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  //   );
  //   console.log('is owner of res: ', txRes);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

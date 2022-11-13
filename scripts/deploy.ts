import { ethers, run, network } from 'hardhat';
import '@nomiclabs/hardhat-etherscan';

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
  // const lockedAmount = ethers.utils.parseEther('1');
  // const Lock = await ethers.getContractFactory('Lock');
  // const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  // await lock.deployed();
  // console.log(
  //   `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  // );

  const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  console.log('Deploying contract...');
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);
  console.log(network.config);
  if (network.config.chainId === 4 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6);
    await verify(simpleStorage.address, []);
  }
}

async function verify(contractAddress: string, args: any) {
  console.log('Verifying contract...');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (error: any) {
    if (error.message.toLowerCase().includes('already verified')) {
      console.log('Already verified!');
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

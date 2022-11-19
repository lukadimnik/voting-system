import { ethers, run, network } from 'hardhat';

async function main() {
  // deploying Lock contract
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;
  const lockedAmount = ethers.utils.parseEther('1');
  const Lock = await ethers.getContractFactory('Lock');
  const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  await lock.deployed();
  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
  );
  console.log(network.config);
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    console.log('Waiting for block confirmations');
    await lock.deployTransaction.wait(6);
    await verify(lock.address, []);
  }

  //   // deploying Simple Storage contract
  //   const SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
  //   console.log('Deploying contract...');
  //   const simpleStorage = await SimpleStorageFactory.deploy();
  //   await simpleStorage.deployed();
  //   console.log(`Deployed contract to: ${simpleStorage.address}`);
  //   console.log(network.config);
  //   if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
  //     console.log('Waiting for block confirmations');
  //     await simpleStorage.deployTransaction.wait(6);
  //     await verify(simpleStorage.address, []);
  //   }

  //   const currentValue = await simpleStorage.retrieve();
  //   console.log(`Current value is: ${currentValue}`);

  //   // update current value
  //   const transactionResponse = await simpleStorage.store(8);
  //   await transactionResponse.wait(1);
  //   const updatedValue = await simpleStorage.retrieve();
  //   console.log(`Updated value is: ${updatedValue}`);
}

async function verify(contractAddress: string, args: any[]) {
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

import { ethers, run, network } from 'hardhat';
import { developmentChains } from '../helper-hardhat-config';
import verify from '../utils/verify';

export default async ({ getNamedAccounts, deployments }: any) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log('---------------------------');
  const args: any[] = [];
  const basicNft = await deploy('BasicNft', {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log('Verifying...');
    await verify(basicNft.address, args);
  }
  log('--------------------------');
};

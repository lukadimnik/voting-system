import {
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from '../helper-hardhat-config';
import verify from '../utils/verify';
import { stringArrtoByte32Arr } from '../utils/toByte32';
import { DeployFunction } from 'hardhat-deploy/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { BasicNft } from '../typechain-types/contracts/BasicNFT.sol/BasicNft';
import { Ballot } from '../typechain-types/contracts/Ballot';

const deployNftAndBallot: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  // @ts-ignore
  const { deployments, getNamedAccounts, network, ethers } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  log('----------------------------------------------------');
  log('Deploying BasicNft contract...');
  const basicNftArgs: any[] = [];
  const basicNft: BasicNft = await deploy('BasicNft', {
    from: deployer,
    args: basicNftArgs,
    log: true,
    waitConfirmations: waitBlockConfirmations || 1,
  });
  log('----------------------------------------------------');
  log('Deploying Ballot contract...');
  const ballotArgs: any[] = [
    await stringArrtoByte32Arr(['John', 'Fred']),
    basicNft.address,
  ];
  const ballot: Ballot = await deploy('Ballot', {
    from: deployer,
    args: ballotArgs,
    log: true,
    waitConfirmations: waitBlockConfirmations || 1,
  });

  // Verify the deployment if not in dev environment
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log('Verifying BasicNft contract...');
    await verify(basicNft.address, basicNftArgs);
    log('Verifying Ballot contract...');
    await verify(ballot.address, ballotArgs);
  }
};

export default deployNftAndBallot;
deployNftAndBallot.tags = ['all', 'nftandballot', 'main'];

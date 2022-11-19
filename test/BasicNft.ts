import { expect } from 'chai';
import { deployments, ethers } from 'hardhat';
import { BasicNft } from '../typechain-types';

describe('BasicNft', () => {
  let deployer;
  let basicNft: BasicNft;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    deployer = accounts[0];
    await deployments.fixture(['basicnft']);
    basicNft = await ethers.getContract('BasicNft');
  });

  it('Allows users to mint and NFT and update counter correctly', async () => {
    const txRes = await basicNft.mintNft();
    await txRes.wait(1);
    const tokenURI = await basicNft.tokenURI(0);
    const tokenCounter = await basicNft.getTokenCounter();

    expect(tokenCounter).to.equal(1);
    expect(tokenURI).to.equal(await basicNft.TOKEN_URI());
  });
});

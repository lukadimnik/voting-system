import { ethers } from 'hardhat';
import { expect, assert } from 'chai';

describe('SimpleStorage', () => {
  let simpleStorageFactory;
  let simpleStorage: any;

  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory('SimpleStorage');
    simpleStorage = await simpleStorageFactory.deploy();
  });

  it('should start with a favorite number of 0', async () => {
    const currentValue = (await simpleStorage.retrieve()) as string;
    const expectedValue = '0';
    assert.equal(currentValue.toString(), expectedValue);
  });

  it('should update when we call store', async () => {
    const expectedValue = '8';
    const transactionResponse = await simpleStorage.store(expectedValue);
    await transactionResponse.wait(1);

    const currentValue = await simpleStorage.retrieve();
    assert.equal(currentValue.toString(), expectedValue);
  });
});

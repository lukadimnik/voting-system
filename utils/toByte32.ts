import { ethers } from 'hardhat';

export async function stringArrtoByte32Arr(args: string[]) {
  const byte32Arr: string[] = [];
  for (let name of args) {
    byte32Arr.push(ethers.utils.formatBytes32String(name));
  }
  return byte32Arr;
}

export async function toByte32(name: string) {
  return ethers.utils.formatBytes32String(name);
}

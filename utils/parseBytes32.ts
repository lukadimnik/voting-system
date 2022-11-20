import { ethers } from 'hardhat';

export async function byte32ArrToStringArr(args: string[]) {
  const stringArr: string[] = [];
  for (let name of args) {
    stringArr.push(ethers.utils.parseBytes32String(name));
  }
  return stringArr;
}

export async function bytesToString(name: string) {
  return ethers.utils.parseBytes32String(name);
}

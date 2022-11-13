const ethers = require('ethers');
const fs = require('fs-extra');

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(
    'HTTP://127.0.0.1:7545'
  );
  const wallet = new ethers.Wallet(
    '9a87bdc4b8f39a1c438e32f1c01431527a38f2cbaf2ef400e10ae4b88f3e96d3',
    provider
  );
  const abi = fs.readFileSync(
    './contracts_SimleStorage_sol_SimpleStorage.abi',
    'utf-8'
  );
  const binary = fs.readFileSync(
    './contracts_SimleStorage_sol_SimpleStorage.bin',
    'utf-8'
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log('Deploying, please wait...');
  const contract = await contractFactory.deploy();
  console.log(contract);
}

main().then(() =>
  process.exit().catch((err) => {
    console.error(err);
    process.exit(1);
  })
);



## Overview

Polar is development framework for building secret contracts. The aim of the project is to make Secret contracts development process simple, efficient and scalable. User can focus on logic of secret contract and not much about further steps in development. It facilitates features such as initiating project repo from contract templates, easy compilation of contracts, deployment and contract testing framework.

## Installation

Polar can be installed using `npm` or `yarn` using below commands:

+    Using Yarn: `yarn global add secret-polar`
+    Using NPM: `npm install -g secret-polar`

Polar requires a local rust environment available to be able to work. To install a rust environment, use command `polar install`.

## Quick Start

This guide will explore the basics of creating a simple Polar project.

Polar allows you to compile your Rust code, generate schema for it, run your scripts, tests and deploy to network, interact with contract instance on the network.

To create your Polar project, run `polar init <project-name>`:

```bash
$ polar init yellow
★ Welcome to polar v0.9.5
Initializing new project in /home/uditgulati/yellow.

★ Project created ★

You need to install these dependencies to run the sample project:
  npm install --save-dev chai

Success! Created project at /home/uditgulati/yellow.
Begin by typing:
  cd yellow
  npx polar help
  npx polar compile
```

The generated directory will have the following initial structure:

```bash
.
├── contracts
│   ├── Cargo.lock
│   ├── Cargo.toml
│   ├── examples
│   │   └── schema.rs
│   ├── src
│   │   ├── contract.rs
│   │   ├── lib.rs
│   │   ├── msg.rs
│   │   └── state.rs
│   └── tests
│       └── integration.rs
├── package.json
├── packages
│   └── cargo_common
│       ├── Cargo.lock
│       ├── Cargo.toml
│       └── src
│           ├── balances.rs
│           ├── cashmap.rs
│           ├── contract.rs
│           ├── lib.rs
│           ├── tokens.rs
│           └── voting.rs
├── polar.config.js
├── README.md
├── scripts
│   └── sample-script.js
└── test
    └── sample-test.js

9 directories, 22 files
```

The `contracts/` directory has all the rust files for the contract logic. `scripts/` directory can contain `.js` and `.ts` scripts that user can write according to the use case, a sample script has been added to give some understanding of how a user script should look like. `test/` directory can contain `.js` and `.ts` scripts to run tests for the deployed contracts.

#### Listing tasks

To see the possible tasks (commands) that are available, run `polar` in your project's folder:

```bash
$ polar
polar version 0.9.5

Usage: polar [GLOBAL OPTIONS] <TASK> [TASK OPTIONS]

GLOBAL OPTIONS:

      --config           	Path to POLAR config file. 
  -h, --help             	Shows this message, or a task's help if its name is provided 
      --network          	The network to connect to. (default: "default")
      --show-stack-traces	Show stack traces. 
      --verbose          	Enables verbose logging 
  -v, --version          	Shows version and exit. 


AVAILABLE TASKS:

  clean    	Clears the cache and deletes specified artifacts files
  compile  	Compile all secret contracts
  help     	Prints this message
  init     	Initializes a new project in the given directory
  install  	Setup rust compiler
  node-info	Prints node info and status
  repl     	Opens polar console
  run      	Runs a user-defined script after compiling the project
  test     	Runs a user-defined test script after compiling the project

To get help for a specific task run: polar help [task]

```

This is the list of built-in tasks. This is your starting point to find out what tasks are available to run.

If you take a look at the `polar.config.js` file, you will find :

```js
const accounts = [
  {
    name: 'account_0',
    address: 'secret1l0g5czqw7vjvd20ezlk4x7ndgyn0rx5aumr8gk',
    mnemonic: 'snack cable erode art lift better october drill hospital clown erase address'
  },
  {
    name: 'account_1',
    address: 'secret1ddfphwwzqtkp8uhcsc53xdu24y9gks2kug45zv',
    mnemonic: 'sorry object nation also century glove small tired parrot avocado pulp purchase'
  }
];

module.exports = {
  networks: {
    default: {
      endpoint: 'http://localhost:1337/'
    },
    development: {
      endpoint: 'tcp://0.0.0.0:26656',
      nodeId: '115aa0a629f5d70dd1d464bc7e42799e00f4edae',
      chainId: 'enigma-pub-testnet-3',
      keyringBackend: 'test',
      types: {}
    },
    // Supernova Testnet
    testnet: {
      endpoint: 'http://bootstrap.supernova.enigma.co:1317',
      chainId: 'supernova-2',
      trustNode: true,
      keyringBackend: 'test',
      accounts: accounts,
      types: {},
      fees: {
        upload: {
            amount: [{ amount: "500000", denom: "uscrt" }],
            gas: "2000000",
        },
        init: {
            amount: [{ amount: "125000", denom: "uscrt" }],
            gas: "500000",
        },
      }
    }
  },
  mocha: {
    timeout: 60000
  },
  rust: {
    version: "1.55.0"
  }
};
```

**Note** that the accounts mentioned above are just a sample, don't use them in mainnet as it can lead to capital loss.

#### Compiling contracts

To compile the contracts, use command `polar compile`. This will compile all the contracts in the project. To compile only one contracts or a subset of all contracts in the project, use command `polar compile <contract-source-dir>`. To skip schema generation while compiling use `polar compile --skip-schema`.

```bash
$ polar compile
Compiling contract in directory: contracts
   Compiling proc-macro2 v1.0.28
   Compiling unicode-xid v0.2.2
   Compiling syn v1.0.74
   Compiling serde_derive v1.0.127
   Compiling serde v1.0.127
   Compiling ryu v1.0.5
   Compiling serde_json v1.0.66
   Compiling schemars v0.7.6
   Compiling doc-comment v0.3.3
   Compiling itoa v0.4.7
   Compiling base64 v0.11.0
   Compiling quote v1.0.9
   Compiling serde_derive_internals v0.25.0
   Compiling schemars_derive v0.7.6
   Compiling snafu-derive v0.6.10
   Compiling snafu v0.6.10
   Compiling serde-json-wasm v0.2.3
   Compiling cosmwasm-std v0.10.0 (https://github.com/enigmampc/SecretNetwork?tag=v1.0.4-debug-print#004c6bca)
   Compiling cosmwasm-schema v0.10.0 (https://github.com/enigmampc/SecretNetwork?tag=v1.0.4-debug-print#004c6bca)
   Compiling cosmwasm-storage v0.10.0 (https://github.com/enigmampc/SecretNetwork?tag=v1.0.4-debug-print#004c6bca)
   Compiling sample-project v0.1.0 (/home/uditgulati/yellow/contracts)
    Finished release [optimized] target(s) in 41.23s
Creating schema for contract in directory: contracts
   Compiling proc-macro2 v1.0.28
   Compiling unicode-xid v0.2.2
   Compiling syn v1.0.74
   Compiling serde_derive v1.0.127
   Compiling serde v1.0.127
   Compiling ryu v1.0.5
   Compiling serde_json v1.0.66
   Compiling schemars v0.7.6
   Compiling doc-comment v0.3.3
   Compiling itoa v0.4.7
   Compiling base64 v0.11.0
   Compiling quote v1.0.9
   Compiling serde_derive_internals v0.25.0
   Compiling schemars_derive v0.7.6
   Compiling snafu-derive v0.6.10
   Compiling snafu v0.6.10
   Compiling serde-json-wasm v0.2.3
   Compiling cosmwasm-std v0.10.0 (https://github.com/enigmampc/SecretNetwork?tag=v1.0.4-debug-print#004c6bca)
   Compiling cosmwasm-schema v0.10.0 (https://github.com/enigmampc/SecretNetwork?tag=v1.0.4-debug-print#004c6bca)
   Compiling cosmwasm-storage v0.10.0 (https://github.com/enigmampc/SecretNetwork?tag=v1.0.4-debug-print#004c6bca)
   Compiling sample-project v0.1.0 (/home/uditgulati/yellow/contracts)
    Finished dev [unoptimized + debuginfo] target(s) in 22.21s
     Running `target/debug/examples/schema`
Created /home/uditgulati/yellow/contracts/schema/init_msg.json
Created /home/uditgulati/yellow/contracts/schema/handle_msg.json
Created /home/uditgulati/yellow/contracts/schema/query_msg.json
Created /home/uditgulati/yellow/contracts/schema/state.json
Created /home/uditgulati/yellow/contracts/schema/count_response.json
Copying file sample_project.wasm from contracts/target/wasm32-unknown-unknown/release/ to artifacts/contracts
Copying file count_response.json from contracts/schema to artifacts/schema/sample_project
Copying file handle_msg.json from contracts/schema to artifacts/schema/sample_project
Copying file init_msg.json from contracts/schema to artifacts/schema/sample_project
Copying file query_msg.json from contracts/schema to artifacts/schema/sample_project
Copying file state.json from contracts/schema to artifacts/schema/sample_project
```

This command will generate compiled `.wasm` files in `artifacts/contracts/` dir and schema `.json` files in `artifacts/schema/` dir.

#### Running user scripts

User scripts are a way to define the flow of interacting with contracts on some network in form of a script. These scripts can be used to deploy a contract, query/transact with the contract.

A sample script `scripts/sample-script.js` is available in the boilerplate. Contents of the script is as follows:

```js
const { Contract, getAccountByName } = require("secret-polar");

async function run () {
  const contract_owner = getAccountByName("account_0");
  const contract = new Contract("sample-project");
  await contract.parseSchema();

  const deploy_response = await contract.deploy(
    contract_owner,
    { // custom fees
      amount: [{ amount: "750000", denom: "uscrt" }],
      gas: "3000000",
    }
  );
  console.log(deploy_response);

  const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);
  console.log(contract_info);

  const inc_response = await contract.tx.increment({account: contract_owner});
  console.log(inc_response);

  const response = await contract.query.get_count();
  console.log(response);

  const transferAmount = [{"denom": "uscrt", "amount": "15000000"}] // 15 SCRT
  const customFees = { // custom fees
    amount: [{ amount: "750000", denom: "uscrt" }],
    gas: "3000000",
  }
  const ex_response = await contract.tx.increment(
    {account: contract_owner, transferAmount: transferAmount}
  );
  // const ex_response = await contract.tx.increment(
  //   {account: contract_owner, transferAmount: transferAmount, customFees: customFees}
  // );
  console.log(ex_response);
}

module.exports = { default: run };
```

The script above deploys, inits contract `sample-project` using account `account_0`. It then increments the count value using transaction `tx.increment()` and finally queries count using query `query.get_count()`.

For the above script to be able to run, an account with name `account_0` must be present in `polar.config.js` and contract artifacts (compiled `.wasm` and schema `.json` files) in `artifacts/` dir must be present for contract `sample-project`.

#### Running test scripts

Test scripts are used to test the contract after deploying it to the network and asserting on the interactions with the contract instance.

A sample test script `test/sample-test.js` is available in the boilerplate. Contents of the script is as follows:

```js
const { expect, use } = require("chai");
const { Contract, getAccountByName, polarChai } = require("secret-polar");

use(polarChai);

describe("sample_project", () => {
  async function setup() {
    const contract_owner = getAccountByName("account_1");
    const other = getAccountByName("account_0");
    const contract = new Contract("sample-project");
    await contract.parseSchema();

    return { contract_owner, other, contract };
  }

  it("deploy and init", async () => {
    const { contract_owner, other, contract } = await setup();
    const deploy_response = await contract.deploy(contract_owner);

    const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);

    await expect(contract.query.get_count()).to.respondWith({ 'count': 102 });
  });
  
  it("unauthorized reset", async () => {
    const { contract_owner, other, contract } = await setup();
    const deploy_response = await contract.deploy(contract_owner);
    
    const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);
    
    await expect(contract.tx.reset({account: other}, 100)).to.be.revertedWith("unauthorized");
    await expect(contract.query.get_count()).not.to.respondWith({ 'count': 1000 });
  });

  it("increment", async () => {
    const { contract_owner, other, contract } = await setup();
    const deploy_response = await contract.deploy(contract_owner);

    const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);

    const ex_response = await contract.tx.increment({account: contract_owner});
    await expect(contract.query.get_count()).to.respondWith({ 'count': 103 });
  });
});
```

Detailed overview of testing is given the Guides section.

#### Using REPL

REPL (read–eval–print loop) gives the a console to do real time interactions with the network. Open the REPL using `polar repl --network <network-name>`. Sample REPL interaction shown below as follows:

```bash
$ polar repl --network testnet
★★★  Welcome to polar REPL ★★★
Try typing: config

polar> config
{
  name: 'testnet',
  config: {
    accounts: [ [Object], [Object], [Object], [Object] ],
    endpoint: 'http://bootstrap.supernova.enigma.co:1317',
    chainId: 'supernova-2',
    trustNode: true,
    keyringBackend: 'test',
    types: {}
  }
}
polar> const contract_owner = polar.getAccountByName("account_0");
Creating client for network: testnet
undefined
polar> const contract = new polar.Contract('sample-project');
Creating client for network: testnet
undefined
polar> const deploy_response = await contract.deploy(contract_owner);
Creating compressed .wasm file for sample_project...
```

When REPL is opened, `polar` library is already imported, use `polar.` to access classes and functions from the library. Polar Runtime Environment can be access using `env` variable and `polar.config.js` data can be accessed using `config` variable.

#### Get node information

Node information can be fetched using `polar node-info --network <network-name>` as follows:

```bash
$ polar node-info --network testnet
Network: testnet
ChainId: supernova-2
Block height: 752832
Node Info:  {
  node_info: {
    protocol_version: { p2p: '8', block: '11', app: '0' },
    id: 'ab6394e953e0b570bb1deeb5a8b387aa0dc6188a',
    listen_addr: 'tcp://0.0.0.0:26656',
    network: 'supernova-2',
    version: '0.34.12',
    channels: '40202122233038606100',
    moniker: 'sg-testnet-0',
    other: { tx_index: 'on', rpc_address: 'tcp://0.0.0.0:26657' }
  },
  application_version: {
    name: 'SecretNetwork',
    server_name: 'secretd',
    version: '1.2.0-beta1-79-g660cb1d9',
    commit: '',
    build_tags: 'netgo ledger hw production',
    go: 'go version go1.15.5 linux/amd64',
    build_deps: [
      'filippo.io/edwards25519@v1.0.0-beta.2',
      'github.com/99designs/keyring@v1.1.6',
      ...
      'gopkg.in/ini.v1@v1.62.0',
      'gopkg.in/yaml.v2@v2.4.0',
      'gopkg.in/yaml.v3@v3.0.0-20210107192922-496545a6307b',
      'nhooyr.io/websocket@v1.8.6'
    ],
    cosmos_sdk_version: 'v0.44.1'
  }
}
```

#### Cleanup artifacts

To clear artifacts data, use `polar clean` and to clean artifacts for only one contract, use `polar clean <contract-name>`.
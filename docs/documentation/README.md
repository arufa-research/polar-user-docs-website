# Documentation

## Getting Started

### Overview

Polar is development framework for building secret contracts. The aim of the project is to make Secret contracts development process simple, efficient and scalable. User can focus on logic of secret contract and not much about further steps in development. It facilitates features such as initiating project repo from contract templates, easy compilation of contracts, deployment and contract testing framework.

### Installation

Polar can be installed using `npm` or `yarn` using below commands:

+    Using Yarn: `yarn global add secret-polar`
+    Using NPM: `npm install -g secret-polar`

Polar requires a local rust environment available to be able to work. To install a rust environment, use command `polar install`.

### Quick Start

This guide will explore the basics of creating a simple Polar project.

Polar allows you to compile your Rust code, generate schema for it, run your scripts, tests and deploy to network, interact with contract instance on the network.

To create your Polar project, run `polar init <project-name>`:

```bash
$ polar init yellow
★ Welcome to polar v0.2.0
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
├── polar.config.js
├── README.md
├── scripts
│   └── sample-script.js
└── test
    └── sample-test.js

6 directories, 13 files
```

The `contracts/` directory has all the rust files for the contract logic. `scripts/` directory can contain `.js` and `.ts` scripts that user can write according to the use case, a sample script has been added to give some understanding of how a user script should look like. `test/` directory can contain `.js` and `.ts` scripts to run tests for the deployed contracts.

#### Listing tasks

To see the possible tasks (commands) that are available, run `polar` in your project's folder:

```bash
$ polar
polar version 0.2.0

Usage: polar [GLOBAL OPTIONS] <TASK> [TASK OPTIONS]

GLOBAL OPTIONS:

      --config           	Path to POLAR config file. 
  -h, --help             	Shows this message, or a task's help if its name is provided 
      --network          	The network to connect to. (default: "default")
      --show-stack-traces	Show stack traces. 
      --verbose          	Enables verbose logging 
  -v, --version          	Shows version and exit. 


AVAILABLE TASKS:

  clean    	Clears the cache and deletes all artifacts
  compile  	Compile all secret contracts
  help     	Prints this message
  init     	Initializes a new project in the given directory
  node-info	Prints node info and status
  repl     	Opens polar console
  run      	Runs a user-defined script after compiling the project

To get help for a specific task run: npx polar help [task]

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
      endpoint: 'http://localhost:1337/',
      accounts: accounts
    },
    development: {
      endpoint: 'tcp://0.0.0.0:26656',
      nodeId: '115aa0a629f5d70dd1d464bc7e42799e00f4edae',
      chainId: 'enigma-pub-testnet-3',
      keyringBackend: 'test',
      types: {}
    },
    // Holodeck Testnet
    testnet: {
      endpoint: 'http://bootstrap.secrettestnet.io',
      chainId: 'holodeck-2',
      trustNode: true,
      keyringBackend: 'test',
      accounts: accounts,
      types: {}
    }
  },
  mocha: {
    timeout: 60000
  }
};
```

**Note** that the accounts mentioned above are just a sample, don't use them in mainnet as it can lead to capital loss.


#### Compiling contracts

To compile the contracts, use command `polar compile`. This will compile all the contracts in the project. To compile only one contracts or a subset of all contracts in the project, use command `polar compile <contract-source-dir>`. 

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

async function run (runtimeEnv) {
  const contract_owner = getAccountByName("account_0", runtimeEnv);
  const contract = new Contract('sample-project', runtimeEnv);
  await contract.parseSchema();

  const deploy_response = await contract.deploy(contract_owner);
  console.log(deploy_response);

  const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);
  console.log(contract_info);

  const ex_response = await contract.tx.increment(contract_owner);
  console.log(ex_response);

  const response = await contract.query.get_count();
  console.log(response);
}

module.exports = { default: run };
```

The script above deploys, inits contract `sample-project` using account `account_0`. It then increments the count value using transaction `tx.increment()` and finally queries count using query `query.get_count()`.

For the above script to be able to run, an account with name `account_0` must be present in `polar.config.js` and contract artifacts (compiled `.wasm` and schema `.json` files) in `artifacts/` dir must be present for contract `sample-project`.

#### Running tests

TODO: This section will be added once testing framework is added to Polar.

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
    accounts: [ [Object], [Object] ],
    endpoint: 'http://bootstrap.secrettestnet.io',
    chainId: 'holodeck-2',
    trustNode: true,
    keyringBackend: 'test',
    types: {}
  }
}
polar> const contract_owner = polar.getAccountByName("account_0", env);
Creating client for network: testnet
undefined
polar> const contract = new polar.Contract('sample-project', env);
Creating client for network: testnet
undefined
polar> const deploy_response = await contract.deploy(contract_owner);
Creating compressed .wasm file using cosmwasm/rust-optimizer:0.12.0...
```

When REPL is opened, `polar` library is already imported, use `polar.` to access classes and functions from the library. Polar Runtime Environment can be access using `env` variable and `polar.config.js` data can be accessed using `config` variable.

#### Get node information

Node information can be fetched using `polar node-info --network <network-name>` as follows:

```bash
$ polar node-info --network testnet
Creating client for network: testnet
Network: testnet
ChainId: holodeck-2
Block height: 4778315
Node Info:  {
  node_info: {
    protocol_version: { p2p: '7', block: '10', app: '0' },
    id: '64b03220d97e5dc21ec65bf7ee1d839afb6f7193',
    listen_addr: 'tcp://0.0.0.0:26656',
    network: 'holodeck-2',
    version: '0.33.8',
    channels: '4020212223303800',
    moniker: 'ChainofSecretsBootstrap',
    other: { tx_index: 'on', rpc_address: 'tcp://0.0.0.0:26657' }
  },
  application_version: {
    name: 'SecretNetwork',
    server_name: 'secretd',
    client_name: 'secretcli',
    version: '1.0.4-2-ge24cdfde',
    commit: 'e24cdfde5cd3b4bdd9b6ca429aafaa552b95e2bf',
    build_tags: 'netgo ledger hw develop',
    go: 'go version go1.13.4 linux/amd64'
  }
}
```

#### Cleanup artifacts

To clear artifacts data, use `polar clean` and to clean artifacts for only one contract, use `polar clean <contract-name>`.

[→ Guide](/guide/README.md)
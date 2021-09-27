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
      endpoint: 'http://localhost:1337/'
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

This command will generate compiled `.wasm` files 

#### Running user scripts

#### Running tests

#### Using REPL

#### Get node information

#### Cleanup artifacts

Note that the accounts mentioned above are just a sample, don't use them in mainnet as it can lead to capital loss.

## Guides

### Setting up a project
### Compiling your contracts
### Testing with ethers.js & Waffle
### Testing with Web3.js & Truffle
### Migrating from Truffle
### Deploying your contracts
### Writing scripts
### Using the Hardhat console
### Creating a task
### Running tests with Ganache

## Troubleshooting

### Verbose logging
### Common problems
### Error codes

## API
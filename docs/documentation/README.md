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
polar version 0.5.0

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

async function run () {
  const contract_owner = getAccountByName("account_0");
  const contract = new Contract('sample-project');
  await contract.parseSchema();

  const deploy_response = await contract.deploy(contract_owner);
  console.log(deploy_response);

  const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);
  console.log(contract_info);

  const ex_response = await contract.tx.increment(contract_owner, []);
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
polar> const deploy_response = await contract.deploy(contract_owner, []);
Creating compressed .wasm file using cosmwasm/rust-optimizer:0.12.0...
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


## Guides


### Setup rust environment

Polar requires a Rust environment installed on local machine to work properly. This Rust environment can be installed in two possible ways.

#### Installing using polar

Use command `polar setup` to install the Rust environment using just one command.

```bash
$ polar setup
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
info: downloading installer

Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

  /home/uditgulati/.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory located at:

  /home/uditgulati/.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  /home/uditgulati/.cargo/bin

This path will then be added to your PATH environment variable by
modifying the profile files located at:

  /home/uditgulati/.profile
  /home/uditgulati/.bashrc

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:


   default host triple: x86_64-unknown-linux-gnu
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes
...
```

#### Installing manually

**Linux**

+ Install `rustup`.

```bash
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
$ export PATH="${HOME}/.cargo/bin:${PATH}"
```

+ Add `wasm32-unknown-unknown` target to `rustup stable` version.

```bash
$ rustup default stable
$ rustup target list --installed
$ rustup target add wasm32-unknown-unknown
```

+ Install `nightly` toolchain. Add `wasm32-unknown-unknown` target to `rustup nightly` version.

```bash
$ rustup install nightly
$ rustup target add wasm32-unknown-unknown --toolchain nightly
```

+ Install `build-essentials`.

```bash
$ sudo apt install build-essential
```


### Setting up a project

Project setup can be broken down to 3 steps broadly, which are boiler plate generation, updating project name and updating `polar.config.js` file.

#### Boilerplate code

Use command `polar init <project-name>` to generate boilerplate code.

```bash
$ polar init yellow
★ Welcome to polar v0.5.0
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

#### Updating name of contract

Replace appearances of `sample-project` and `sample_project` from following files to your project name.

```bash
$ grep -r "sample-project"
package.json:  "name": "sample-project",
contracts/Cargo.lock:name = "sample-project"
contracts/Cargo.toml:name = "sample-project"
scripts/sample-script.js:  const contract = new Contract('sample-project', runtimeEnv);
```

```bash
$ grep -r "sample_project"
contracts/examples/schema.rs:use sample_project::msg::{CountResponse, HandleMsg, InitMsg, QueryMsg};
contracts/examples/schema.rs:use sample_project::state::State;
```

Replacing them with a project name suppose `yellow` should look like following:

```bash
$ grep -r "yellow"
package.json:  "name": "yellow",
contracts/Cargo.lock:name = "yellow"
contracts/Cargo.toml:name = "yellow"
contracts/examples/schema.rs:use yellow::msg::{CountResponse, HandleMsg, InitMsg, QueryMsg};
contracts/examples/schema.rs:use yellow::state::State;
scripts/sample-script.js:  const contract = new Contract('yellow', runtimeEnv);
```

Now compiling using `polar compile` would create following structure in `artifacts/` dir:

```bash
artifacts/
├── contracts
│   └── yellow.wasm
└── schema
    └── yellow
        ├── count_response.json
        ├── handle_msg.json
        ├── init_msg.json
        ├── query_msg.json
        └── state.json

3 directories, 6 files
```

#### Polar config

Polar uses config file `polar.config.js` to execute tasks for the given project. Initial contents of `polar.config.js` file are explained below:

**Network config**. Has following parameters:

+ endpoint: Network endpoint.
+ chainId: Network chain id.
+ trustNode: Should be set to `true`.
+ keyringBackend: Alias of keyring backend to be used.
+ accounts: Array of accounts.
+ fess: custom fees limits for each type of txns from upload, init, execute and send.

```js
networks: {
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
}
```

**Accounts config**. It is an array of account objects. Each account object has following parameters:

+ name: Account name (alias). Does not need to match the account name anywhere else outside the project.
+ address: Account address.
+ mnemonic: Mnemonic for the account. Do not push this value to a public repository.

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
```

**Mocha test config**. Increase/decrease the `timeout` value to tweak test framework timeout.

```js
mocha: {
  timeout: 60000
}
```


### Compiling your contracts

Compiling contracts can be done using the command `polar compile`.

#### Compile all contracts

`polar compile` by default compiles all the contracts in the `contracts/` directory. For each contract compiled, corresponding `.wasm` file is stored in the `artifacts/contracts` directory created in project's root directory.

#### Compile one contract

To compile only one contract or a subset of all contracts in the `contract/` directory, use command `polar compile <sourcePaths>` and this can look something like `polar compile contracts/sample-project` or `polar compile contracts/sample-project-1 contracts/sample-project-2`.

#### Schema generation

Schema is also generated alongside the compiled `.wasm` file for each of the contract compiled using `polar compile` command. Schema files are `.json` files (stored inside `artifacts/schema/`) directory and there are multiple `.json` files per contract but only one `.wasm` compiled file per contract.

Single contract `artifacts/` directory structure:

```bash
.
├── contracts
│   └── sample_project.wasm
└── schema
    └── sample_project
        ├── count_response.json
        ├── handle_msg.json
        ├── init_msg.json
        ├── query_msg.json
        └── state.json

3 directories, 6 files
```

Multi contract `artifacts/` directory structure:

```bash
.
├── contracts
|   ├── sample_project_1.wasm
│   └── sample_project_2.wasm
└── schema
    ├── sample_project
    │   ├── count_response.json
    │   ├── handle_msg.json
    │   ├── init_msg.json
    │   ├── query_msg.json
    │   └── state.json
    └── sample_project_1
        ├── count_response.json
        ├── handle_msg.json
        ├── init_msg.json
        ├── query_msg.json
        └── state.json

4 directories, 12 files
```

### Writing scripts

#### Sample script walkthrough

Polar boilerplate code has sample script `scripts/sample-script.js` with following content: 

```js
const { Contract, getAccountByName } = require("secret-polar");

async function run () {
  const contract_owner = getAccountByName("account_0");
  const contract = new Contract('sample-project');
  await contract.parseSchema();

  const deploy_response = await contract.deploy(contract_owner);
  console.log(deploy_response);

  const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);
  console.log(contract_info);

  const ex_response = await contract.tx.increment(contract_owner, []);
  console.log(ex_response);

  const response = await contract.query.get_count();
  console.log(response);
}

module.exports = { default: run };
```

Following is a line-by-line breakdown of the above script:

+ Import `Contract` class and `getAccountByName` method from `secret-polar` library.

```js
const { Contract, getAccountByName } = require("secret-polar");
```

+ `run` function definition. It should have the same signature as below with no argument. This `run` function is called by polar.

```js
async function run () {
```

+ Fetch details of account `account_0` into `contract_owner` object.

```js
  const contract_owner = getAccountByName("account_0");
```

+ Create `Contract` object for contract with name `sample-project`.

```js
  const contract = new Contract('sample-project');
```

+ Load schema files for contract `sample-json`. Will generate error if schema files are not present, so make sure to run `polar compile` before running this.

```js
  await contract.parseSchema();
```

+ Deploy the contract. Network is specified in the `polar run scripts/<script-name> --network <network-name>` command.

```js
  const deploy_response = await contract.deploy(contract_owner);
```

+ Instantiate contract instance with values `{"count": 102}` and label `"deploy test"` and account `contract_owner`.

```js
  const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);
```

+ Execute `increment()` transaction using account `contract_owner`. For each contract execute method, calling signature is `contract.tx.<method_name>(<signing_account>, <tokens_to_send_with_txn>, ...<method_args>);`.

```js
  const ex_response = await contract.tx.increment(contract_owner, []);
```

+ Fetch count value using query `get_count()`.

```js
  const response = await contract.query.get_count();
```

+ Export `run` function as default for the script. Default function is called by polar runner.

```js
module.exports = { default: run };
```

#### Polar Runtime Environment

Polar runtime environment is used internally by polar. It is created when a polar task is executed using bash command `polar ...`. It can be accessed in REPL using variable `env`. It has following parameters:

+ **config**: Has paths of config file, contract sources, artifacts, project root and test path. Other config values such as networks config and mocha timeout.

```js
config: {
  networks: { testnet: [Object], default: [Object], development: [Object] },
  mocha: { timeout: 60000 },
  paths: {
    root: '/home/uditgulati/yellow',
    configFile: '/home/uditgulati/yellow/polar.config.js',
    sources: '/home/uditgulati/yellow/contracts',
    cache: '/home/uditgulati/yellow/cache',
    artifacts: '/home/uditgulati/yellow/artifacts',
    tests: '/home/uditgulati/yellow/test'
  }
}
```

+ **runtimeArgs**: Runtime metadata such as network to use etc. Network can be specified in a polar command like `polar ... --network <network-name>`.

```js
runtimeArgs: {
  network: 'testnet',
  showStackTraces: false,
  version: false,
  help: false,
  verbose: false
}
```

+ **tasks**: List of available tasks with details.

```js
tasks: {
  help: SimpleTaskDefinition {
    ...
  },
  init: SimpleTaskDefinition {
    ...
  },
  compile: SimpleTaskDefinition {
    ...
  },
  clean: SimpleTaskDefinition {
    ...
  },
  'node-info': SimpleTaskDefinition {
    ...
  },
  run: SimpleTaskDefinition {
    ...
  },
  repl: SimpleTaskDefinition {
    ...
  }
}
```

+ **network**: Details of the network currently being used.

```js
network: {
  name: 'testnet',
  config: {
    accounts: [Array],
    endpoint: 'http://bootstrap.supernova.enigma.co:1317',
    chainId: 'supernova-2',
    trustNode: true,
    keyringBackend: 'test',
    types: {}
  }
}
```

#### Contract class

Contract class is used to create an object which does operations related to a contract such as deploying, interacting with network. One can also list query, execute methods available for the contract using this class.

**Constructor**

Contract constructor requires 1 argument, contract name. If contract `.wasm` file is not present in artifacts then this constructor will throw an error.

```js
const contract = new Contract(<contract-name>);
```

**parseSchema()**

This method reads schema files from `artifacts/schema/` dir and fills query methods in `contract.query` object and execute methods in `contract.tx` object. This method will throw error if schema is not generated.

```js
contract.parseSchema();
```

**deploy()**

Deploys the contract.

```js
const deploy_response = await contract.deploy(contract_owner);
```

Gives following response:

```js
{
  codeId: <code-id-val>,
  contractCodeHash: <code-hash-val>,
  deployTimestamp: <timestamp>
}
```

**instantiate()**

Instantiate the contract.

```js
const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);
```

Gives following response:

```js
{
  contractAddress: <contract-address>,
  instantiateTimestamp: <timestamp>
}
```

**tx methods**

To list contract's execute methods, print `contract.tx`.

```js
polar> contract.tx
{ increment: [Function (anonymous)], reset: [Function (anonymous)] }
```

**query methods**

To list contract's query methods, print `contract.query`.

```js
polar> contract.query
{ get_count: [Function (anonymous)] }
```

#### getAccountByName

In the sample `polar.config.js` file, the accounts are defined as below:

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
```

These accounts can be easily accessed inside the scripts or in repl using the method, `getAccountByName(<account_name>)`, for example:

```js
const { getAccountByName } = require("secret-polar");

const account_0 = getAccountByName("account_0");
const account_1 = getAccountByName("account_1");

console.log(account_0.name);  // account_0
console.log(account_0.address); // secret1l0g5czqw7vjvd20ezlk4x7ndgyn0rx5aumr8gk
console.log(account_0.mnemonic); // snack cable erode art lift better october drill hospital clown erase address
```

#### createAccounts

This method is used to generate new accounts and then can be filled with some balance using a testnet faucet `https://faucet.supernova.enigma.co/` (faucet are only for testnets). 

```js
const { createAccounts } = require("secret-polar");

const res = await createAccounts(1); // array of one account object
const res = await createAccounts(3);  // array of three account objects
```

#### Checkpoints

Checkpoints store the metadata of contract instance on the network. It stores the deploy metadata (codeId, contractCodeHash, deployTimestamp) and instantiate metadata (contractAddress, instantiateTimestamp). This comes handy when a script is run which deploys, inits and does some interactions with the contracts. 

Suppose the script fails after init step and now script is to be rerun after some fixes in the contract, here one does not want for the contract to be deployed and instantiated again, so polar picks up the saved metadata from checkpoints file and directly skips to part after init and uses the previously deployed instance and user does not have to pay the extra gas and wait extra time to deploy, init the contract again. Same happens when there is error before init and rerun skips deploy and directly executes init step.

### Testing contracts

Contracts can be tested in two ways, one by writing rust tests in the `contract.rs` file itself, and other way is to write a mocha test script that interacts with deployed contract and assert the returned values. There are examples for both in the `sample-project` created after `polar init` step.

#### Rust tests

These tests can be run by going into the contract's directory having `Cargo.toml` file and running the command `cargo test`.

#### Client interaction tests

These tests can be run by running the command `polar run test --network <network-name>`.

#### Test scripts

Polar has support for user to write tests on top of js interactions with the deployed contract instance. These scripts are stored in the `test/` directory in the project's root directory.

A polar test script has the same structure as a mocha test file with `describe` and `it` blocks, a sample test is explained below:

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
    
    await expect(contract.tx.reset(other, [], 100)).to.be.revertedWith("unauthorized");
    await expect(contract.query.get_count()).not.to.respondWith({ 'count': 1000 });
  });

  it("increment", async () => {
    const { contract_owner, other, contract } = await setup();
    const deploy_response = await contract.deploy(contract_owner);

    const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);

    const ex_response = await contract.tx.increment(contract_owner, []);
    await expect(contract.query.get_count()).to.respondWith({ 'count': 103 });
  });
});
```

Following is a breakdown of the above script:

+ Import `expect` and `use` from chai, `Contract`, `getAccountByName` and `polarChai` from secret-polar and add polar asserts to chai using `use(polarChai)`.

```js
const { expect, use } = require("chai");
const { Contract, getAccountByName, polarChai } = require("secret-polar");

use(polarChai);
```

+ `setup()` method does the initial common steps for each test, such as creating `Account` objects, creating `Contract` objects and parsing contract's schema files.

```js
  async function setup() {
    const contract_owner = getAccountByName("account_1");
    const other = getAccountByName("account_0");
    const contract = new Contract("sample-project");
    await contract.parseSchema();

    return { contract_owner, other, contract };
  }
```

+ First test: Deploys, inits the contract and tests query count value.

```js
  it("deploy and init", async () => {
    const { contract_owner, other, contract } = await setup();
    const deploy_response = await contract.deploy(contract_owner);

    const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);

    await expect(contract.query.get_count()).to.respondWith({ 'count': 102 });
  });
```

+ Second test: Deploys, inits the contract and tests query unauthorized execution of `reset()` transaction.

```js
  it("unauthorized reset", async () => {
    const { contract_owner, other, contract } = await setup();
    const deploy_response = await contract.deploy(contract_owner);
    
    const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);
    
    await expect(contract.tx.reset(other, [], 100)).to.be.revertedWith("unauthorized");
    await expect(contract.query.get_count()).not.to.respondWith({ 'count': 1000 });
  });
```

+ Third test: Deploys, inits the contract and tests `increment` transaction.

```js
  it("increment", async () => {
    const { contract_owner, other, contract } = await setup();
    const deploy_response = await contract.deploy(contract_owner);

    const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);

    const ex_response = await contract.tx.increment(contract_owner, []);
    await expect(contract.query.get_count()).to.respondWith({ 'count': 103 });
  });
```

**Note:** It is fine to have `deploy`, `instantiate` in each test as they are not executed multiple times for a given contract. Moving these steps in the `setup()` method is fine too.

<!--

## Troubleshooting

### Verbose logging
### Common problems
### Error codes

## API -->


### Using localnet with polar

#### Setup the Local Developer Testnet

In this document you'll find information on setting up a local Secret Network developer testnet (secretdev).

#### Running the docker container

The developer blockchain is configured to run inside a docker container. Install Docker for your environment .
Open a terminal window and change to your project directory. Then start SecretNetwork, labelled secretdev from here on:

```bash
docker run -it --rm \
 -p 26657:26657 -p 26656:26656 -p 1337:1337 \
 --name secretdev enigmampc/secret-network-sw-dev
```
A few accounts are available with the following information that can be used for the development and testing purpose on the localnet.

{
  "name": "a",
  "type": "local",
  "address": "secret12alhz3va0sz9zj7wwtfvxnrpsqhj6lw2dge0zc",
  "pubkey": "secretpub1addwnpepq2qckftgul7ex8nauluqrdc9y2080wxr0xsve7cmx3lhe777ne59wzg9053",
  "mnemonic": "tide universe inject switch average weather obvious cube wrist shaft record chat dentist wink collect hungry cycle draw ribbon course royal indoor remind address"
}

we need to copy the name , address and mnemonic info of the accounts that we get on running the docker in our polar config file. Also it should be noted that the accounts that are to be interacted with must be on the same network. In this case the account must be present on the localnet.

The secretdev docker container can be stopped by CTRL+C. At this point you're running a local SecretNetwork full-node. 

#### Checking the node info

We can then check the node info and status of the node. Open a new terminal :

```bash
polar node-info
Creating client for network: default
Network: default
ChainId: enigma-pub-testnet-3
Block height: 35
Node Info:  {
  node_info: {
    protocol_version: { p2p: '7', block: '10', app: '0' },
    id: '115aa0a629f5d70dd1d464bc7e42799e00f4edae',
    listen_addr: 'tcp://0.0.0.0:26656',
    network: 'enigma-pub-testnet-3',
    version: '0.33.8',
    channels: '4020212223303800',
    moniker: 'banana',
    other: { tx_index: 'on', rpc_address: 'tcp://0.0.0.0:26657' }
  },
  application_version: {
    name: 'SecretNetwork',
    server_name: 'secretd',
    client_name: 'secretcli',
    version: '1.0.4-debug-print-45-g038cd80b',
    commit: '',
    build_tags: 'netgo ledger sw',
    go: 'go version go1.15.5 linux/amd64'
  }
}
```

#### Compile the contract

Then we need to compile the contract. This can be done by the following command.

```bash
polar compile
```

#### Running scripts on Localnet

To run any script on localnet open a new terminal :

```bash
polar run scripts/sample-script.js
```

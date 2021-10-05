## Guide


### Setup rust environment

Polar requires a Rust environment installed on local machine to work properly. This Rust environment can be installed in two possible ways. For detailed installation process refer [Rust Environment Installation](/rustEnv/README.md) guide.

### Setting up a project

Project setup can be broken down to 3 steps broadly, which are boiler plate generation, updating project name and updating `polar.config.js` file.

#### Boilerplate code

Use command `polar init <project-name>` to generate boilerplate code.

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

```js
networks: {
  // Holodeck Testnet
  testnet: {
    endpoint: 'http://bootstrap.secrettestnet.io',
    chainId: 'holodeck-2',
    trustNode: true,
    keyringBackend: 'test',
    accounts: accounts,
    types: {}
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

#### Compile all contracts

#### Compile one contract

#### Schema generation





### Writing scripts

#### Sample script walkthrough

Polar boilerplate code has sample script `scripts/sample-script.js` with following content: 

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

Following is a line-by-line breakdown of the above script:

+ Import `Contract` class and `getAccountByName` method from `secret-polar` library.

```js
const { Contract, getAccountByName } = require("secret-polar");
```

+ `run` function definition. It should have the same signature as below with just one argument `runtimeEnv`. This `run` function is called by polar. Polar runtime environment is explained in detail in the next section.

```js
async function run (runtimeEnv) {
```

+ Fetch details of account `account_0` into `contract_owner` object.

```js
  const contract_owner = getAccountByName("account_0", runtimeEnv);
```

+ Create `Contract` object for contract with name `sample-project`.

```js
  const contract = new Contract('sample-project', runtimeEnv);
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

+ Execute `increment()` transaction using account `contract_owner`.

```js
  const ex_response = await contract.tx.increment(contract_owner);
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

+ **config**: Has paths of config file, contract sources, artifacts, project root and test path. Other config values such as networks cfg and mocha timeout.

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
    endpoint: 'http://bootstrap.secrettestnet.io',
    chainId: 'holodeck-2',
    trustNode: true,
    keyringBackend: 'test',
    types: {}
  }
}
```

#### Contract class

Contract class is used to create an object which does operations related to a contract such as deploying, interacting with network. One can also list query, execute methods available for the contract using this class.

**Constructor**

Contract constructor requires 2 arguments, contract name and polar runtime environment. If contract `.wasm` file is not present in artifacts then this constructor will throw an error.

```js
const contract = new Contract(<contract-name>, env);
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

#### createAccounts

#### Checkpoints

[← Documentation](/documentation/README.md)



<!-- 
### Testing contracts

#### Rust unit tests

#### Rust integration tests

#### Client interaction tests

#### Test scripts




## Troubleshooting

### Verbose logging
### Common problems
### Error codes

## API -->
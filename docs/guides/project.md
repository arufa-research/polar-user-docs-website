

### Setting up a project

Project setup can be broken down to 3 steps broadly, which are boiler plate generation, updating project name and updating `polar.config.js` file.

#### Boilerplate code

Use command `polar init <project-name>` to generate boilerplate code. Use command `polar init <project-name> <template-name>` to generate boilerplate code using a particular template (template names can be found from repository `https://github.com/arufa-research/polar-templates`).

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

#### Updating name of contract

Replace appearances of `sample-project` and `sample_project` from following files to your project name.

```bash
$ grep -r "sample-project"
package.json:  "name": "sample-project",
contracts/Cargo.lock:name = "sample-project"
contracts/Cargo.toml:name = "sample-project"
scripts/sample-script.js:  const contract = new Contract('sample-project');
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
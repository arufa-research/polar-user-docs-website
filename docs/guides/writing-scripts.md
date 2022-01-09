### Writing scripts

#### Sample script walkthrough

Polar boilerplate code has sample script `scripts/sample-script.js` with following content: 

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

+ Execute `increment()` transaction using account `contract_owner`. For each contract execute method, calling signature is `contract.tx.<method_name>({account: <signing_account>, transferAmount: <tokens_to_send_with_txn>, customFees: <custom_fees_struct>}, ...<method_args>);`.

```js
  const ex_response = await contract.tx.increment({account: contract_owner});
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

+ **runtimeArgs**: Runtime metadata such as network to use etc. Network can be specified in a polar command like `polar ... --network <network-name>`.

+ **tasks**: List of available tasks with details.

+ **network**: Details of the network currently being used.

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

To skip using checkpoints when running script, use `polar run <script-path> --skip-checkpoints`.

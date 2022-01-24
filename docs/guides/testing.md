### Testing contracts

Contracts can be tested in two ways, one by writing rust tests in the `contract.rs` file itself, and other way is to write a mocha test script that interacts with deployed contract and assert the returned values. There are examples for both in the `sample-project` created after `polar init` step.

#### Rust tests

These tests can be run by going into the contract's directory having `Cargo.toml` file and running the command `cargo test`.

#### Client interaction tests

These tests can be run by running the command `polar test --network <network-name>`.

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

+ First test: Deploys, inits the contract and tests query count value. Polar automatically creates dynamic label for test deploys, which means that below label "deploy test" is not used instead "deploy <contract_name> <curr_ts>" is used which is always unique, so you don't have to manually change label for each test run.

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
    
    await expect(contract.tx.reset({account: other}, 100)).to.be.revertedWith("unauthorized");
    await expect(contract.query.get_count()).not.to.respondWith({ 'count': 1000 });
  });
```

+ Third test: Deploys, inits the contract and tests `increment` transaction.

```js
  it("increment", async () => {
    const { contract_owner, other, contract } = await setup();
    const deploy_response = await contract.deploy(contract_owner);

    const contract_info = await contract.instantiate({"count": 102}, "deploy test", contract_owner);

    const ex_response = await contract.tx.increment({account: contract_owner});
    await expect(contract.query.get_count()).to.respondWith({ 'count': 103 });
  });
```

**Note:** It is fine to have `deploy`, `instantiate` in each test as they are not executed multiple times for a given contract. Moving these steps in the `setup()` method is fine too.

#### Chai matchers

A set of chai matchers, makes your test easy to write and read. Before you can start using the matchers, you have to tell chai to use the polarChai plugin:

```js
const { expect, use } = require("chai");
const { Contract, getAccountByName, polarChai } = require("secret-polar");

use(polarChai);
```

Below is the list of available matchers:

+ **Execution Response**

Testing what response was received after transaction execution:

```js
await expect(contract.query.get_count()).to.respondWith({ 'count': 102 });
```

+ **Revert**

Testing if transaction was reverted:

```js
await expect(contract.tx.reset({account: other}, 100)).to.be.reverted;
```

+ **Revert with message**

Testing if transaction was reverted with certain message:

```js
await expect(contract.tx.reset({account: other}, 100)).to.be.revertedWith("unauthorized");
```

+ **Change SCRT balance**

Testing whether the transaction changes the SCRT (native token of chain) balance of the account:

```js
const transferAmount = [{"denom": "uscrt", "amount": "15000000"}] // 15 SCRT

await expect(() => await contract.tx.increment({account: contract_owner, transferAmount: transferAmount}))
  .to.changeScrtBalance(AddressTo, 15000000);
```

changeScrtBalance ignores transaction fees by default:

```js
const transferAmount = [{"denom": "uscrt", "amount": "15000000"}] // 15 SCRT

// Default behavior
await expect(() => await contract.tx.increment({account: contract_owner, transferAmount: transferAmount}))
  .to.changeScrtBalance(AddressTo, 15000000);

// To include the transaction fee use:
await expect(() => await contract.tx.increment({account: contract_owner, transferAmount: transferAmount}))
  .to.changeScrtBalance(AddressFrom, 15020000, true);
```

+ **Change token balance**

Testing whether the transfer changes the balance of the account:

```js
const transferAmount = [{"denom": "usefi", "amount": "15000000"}] // 15 SEFI

await expect(() => await contract.tx.increment({account: contract_owner, transferAmount: transferAmount}))
  .to.changeTokenBalance(AddressTo, "usefi", 15000000);
```

Note: changeTokenBalance calls should not be chained. If you need to check changes of the balance for multiple accounts, you should use the changeTokenBalances matcher.

+ **Change token balance (multiple accounts)**

Testing whether the transaction changes balance of multiple accounts:

```js
const transferAmount = [{"denom": "usefi", "amount": "15000000"}] // 15 SEFI

await expect(() => await contract.tx.increment({account: contract_owner, transferAmount: transferAmount}))
  .to.changeTokenBalance([AddressTo, AddressFrom], "usefi", [15000000, -15000000]);
```

+ **Proper address**

Testing if a string is a proper address:

```js
expect('0x28FAA621c3348823D6c6548981a19716bcDc740e').to.be.properAddress;
```

+ **Proper secret address**

Testing if a string is a proper address:

```js
expect('secret1l0g5czqw7vjvd20ezlk4x7ndgyn0rx5aumr8gk').to.be.properAddress;
```

+ **Proper hex**

Testing if a string is a proper hex value of given length:

```js
expect('0x70').to.be.properHex(2);
```

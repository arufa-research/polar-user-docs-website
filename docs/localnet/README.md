## How to start local net and use it's keys in polar


### Setup the Local Developer Testnet

In this document you'll find information on setting up a local Secret Network developer testnet (secretdev).

### Running the docker container

The developer blockchain is configured to run inside a docker container. Install Docker for your environment .
Open a terminal window and change to your project directory. Then start SecretNetwork, labelled secretdev from here on:

```bash
docker run -it --rm \
 -p 26657:26657 -p 26656:26656 -p 1337:1337 \
 --name secretdev enigmampc/secret-network-sw-dev
```
A few accounts are available with the following information that can be used for the testing purpose.

{
  "name": "a",
  "type": "local",
  "address": "secret12alhz3va0sz9zj7wwtfvxnrpsqhj6lw2dge0zc",
  "pubkey": "secretpub1addwnpepq2qckftgul7ex8nauluqrdc9y2080wxr0xsve7cmx3lhe777ne59wzg9053",
  "mnemonic": "tide universe inject switch average weather obvious cube wrist shaft record chat dentist wink collect hungry cycle draw ribbon course royal indoor remind address"
}

The secretdev docker container can be stopped by CTRL+C. At this point you're running a local SecretNetwork full-node. 

### Running the docker container

To view and manage the secret keys open a new terminal in your project directory.

```bash
docker exec -it secretdev /bin/bash

```
The local blockchain have some keys setup . These keys are stored in the test keyring backend, which makes it easier for local development and testing.

```bash
secretcli keys list --keyring-backend test
[
  {
    "name": "a",
    "type": "local",
    "address": "secret12alhz3va0sz9zj7wwtfvxnrpsqhj6lw2dge0zc",
    "pubkey": "secretpub1addwnpepq2qckftgul7ex8nauluqrdc9y2080wxr0xsve7cmx3lhe777ne59wzg9053"
  },
  {
    "name": "b",
    "type": "local",
    "address": "secret1wghzldphtc7fwp9wqvwt5myh6j0m8mymk3cc5c",
    "pubkey": "secretpub1addwnpepq0fq9xecn783qdecpte8673kfu93x56gllk2re4kmfqj8gchpf3nvqq0058"
  },
  {
    "name": "c",
    "type": "local",
    "address": "secret1466g2kc605eeuu569ruh2whhchsgj72kqatj9s",
    "pubkey": "secretpub1addwnpepqw457c29cxlf23l5r2vd0frhm5fdckqxkerk0qcx94xarmjr435ugk688j4"
  },
  {
    "name": "d",
    "type": "local",
    "address": "secret1rfft0y97u4chs4ap3ceyvfsdugkjx5l0qjfpaz",
    "pubkey": "secretpub1addwnpepqfv9tt8n9y23fkxpr8xgeqddtrtu3mlkmmfsam9svywaz4h0qn8zznyh464"
  }
]
```

exit when you are done.

### Checking the node info

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
### Running scripts on Localnet

To run any script on localnet open a new terminal :

```bash
polar run scripts/sample-script.js
```

It will call the compression docker image and compress the .wasm file by using cosmwasm/rust-optimizer:0.12.0...
This compressed .wasm file is then used to create a contract instance and deploy the contract.

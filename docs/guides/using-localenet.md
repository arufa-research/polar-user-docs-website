### Using localnet with polar

#### Setup the Local Developer Testnet

In this document you'll find information on setting up a local Secret Network.

#### Running the docker container

The developer blockchain is configured to run inside a docker container. Install Docker for your environment .
Open a terminal window and change to your project directory. Then start SecretNetwork, labelled `localsecret` from here on:

```bash
docker run -it --rm \
 -p 26657:26657 -p 26656:26656 -p 1337:1337 \
 --name localsecret ghcr.io/scrtlabs/localsecret
```

LocalSecret comes with a few acocunts with pre-seeded SCRT for you to use. You can import them into your environment (Keplr, secretcli, secret.js) using these seeds: https://docs.scrt.network/dev/LocalSecret.html#accounts

To read the full LocalSecret docs go to: https://docs.scrt.network/dev/LocalSecret.html

The `localsecret` docker container can be stopped by CTRL+C. At this point you're running a local SecretNetwork full-node.

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

Then we need to compile the contract. This can be done by the following command:

```bash
polar compile
```

#### Running scripts on Localnet

To run any script on localnet open a new terminal and execute:

```bash
polar run scripts/sample-script.js
```

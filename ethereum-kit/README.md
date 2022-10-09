# Ethereum Kit

`Ethereum Kit` is a fullstack dapp workspace template for ethereum platform. When launched via VS Code the kit creates 3 independent containers for hosting a client, a dapp, and a blockchain node and links them together.

## Setup Workspace

1. Copy `ethereum-kit` folder.
2. Open `.env` and set `APP_NAME` to the application name you desire.
3. Launch the Visual Studio Code with Remote Container like so:

```
govind@thinkpad:~/poc/ethereum-kit$ cd client/
govind@thinkpad:~/poc/ethereum-kit/client$ code .
```

3. Open terminal in the client container

## Cleanup Workspace

1. Go to `ethereum-kit` folder
2. Execute following command to remove all containers launched by the Visual Studio Code.

```
govind@thinkpad:~/poc/ethereum-kit$ ./clean.sh

```

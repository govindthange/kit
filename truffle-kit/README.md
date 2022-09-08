# Truffle Kit

Its a time consuming process to setup an integrated development environment for building DApps on an Ethereum platform.

`Truffle Kit` attempts to solve this problem by using `VS Code Remote Plugin` and sets up an integrated workspace by launching separate containers for Node JS, Truffle Suite Framework, and Ganache-CLI.

## Setup Workspace

1. Copy truffle-kit folder.
2. Launch the Visual Studio Code with Remote Container like so:

```
govind@thinkpad:~/poc/truffle-kit$ cd dapp/
govind@thinkpad:~/poc/truffle-kit/dapp$ code .
```

3. Open terminal in the dapp container

## Cleanup Workspace

1. Go to [truffle-kit] folder
2. Execute following command to remove all containers launched by the Visual Studio Code.

```
govind@thinkpad:~/poc/truffle-kit$ docker-compose -f ./docker-compose.yml down

```

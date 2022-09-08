# Truffle Kit

It is time consuming to setup a develop enveronment for an Ethereum based DApp where you need Node JS & Truffle Suite installed while having a private blockchain running.

`Truffle Kit` attempts to solve this problem by using `VS Code Remote Plugin` along with devcontainer.json file to setup a development workspace using multiple docker containers to separately host Node JS, Truffle Suite Framework, and Ganache-CLI.

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

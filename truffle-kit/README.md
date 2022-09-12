# Truffle Kit

`Truffle Kit` is an ethereum app development workspace template that bundles Truffle Suite with Node JS, Ganache-CLI, and React JS library.

`Truffle Suite` is best suited for building ethereum based DApps. It is a node runtime-based framework that can help implement DevOps, CI/CD, and continuous deployment with ease. But setting up `Truffle` as a standalone piece is not enough and it is very time consuming to correctly set it up along side Geth, Ganache-CLI, React, and other components.

`Truffle Kit` attempts to solve this problem by using `VS Code Remote Plugin` and sets up a fully integrated workspace that can launch separate containers for Truffle Suite Framework, Ganache-CLI, Geth etc.

## Setup Workspace

1. Copy `truffle-kit` folder.
2. Launch the Visual Studio Code with Remote Container like so:

```
govind@thinkpad:~/poc/truffle-kit$ cd dapp/
govind@thinkpad:~/poc/truffle-kit/dapp$ code .
```

3. Open terminal in the dapp container

## Cleanup Workspace

1. Go to `truffle-kit` folder
2. Execute following command to remove all containers launched by the Visual Studio Code.

```
govind@thinkpad:~/poc/truffle-kit$ docker-compose -f ./docker-compose.yml down

```

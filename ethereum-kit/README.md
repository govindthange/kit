# Ethereum Kit

`Ethereum Kit` is a fullstack dapp workspace template for ethereum platform. When launched via VS Code the kit creates 3 independent containers for hosting a web-app, a dapp, and a blockchain node and links them together.

## Setup Workspace

1. Copy `ethereum-kit` folder.
2. Launch the Visual Studio Code with Remote Container like so:

```
govind@thinkpad:~/poc/ethereum-kit$ cd web-app/
govind@thinkpad:~/poc/ethereum-kit/web-app$ code .
```

3. Open terminal in the dapp container

## Cleanup Workspace

1. Go to `ethereum-kit` folder
2. Execute following command to remove all containers launched by the Visual Studio Code.

```
govind@thinkpad:~/poc/ethereum-kit$ docker-compose -f docker-compose-web-app.yml -f docker-compose-dapp.yml -f docker-compose.yml down

```

# Ethereum Truffle Kit

`Ethereum Truffle Kit` is a fullstack dapp workspace template for ethereum platform. When launched via VS Code the kit creates 3 independent containers for hosting a client, a dapp, and a blockchain node and links them together.

`Truffle Suite` is best suited for building DApps on the ethereum platform. It is a node runtime-based framework that can help implement DevOps, CI/CD, and continuous deployment with ease. But setting up `Truffle` as a standalone unit is not enough and it is very time consuming to correctly set it along side Node/NPM, Ganache-CLI, React, and other needed components.

`Ethereum Truffle Kit` attempts to solve this problem by using `VS Code Remote Plugin` and sets up a fully integrated workspace that can launch separate containers for Truffle Suite Framework, Ganache-CLI, Geth etc.


## Setup Workspace

1. Copy `ethereum-truffle-kit` folder.
2. Open `.env` and set `APP_NAME` to the application name you desire.
3. Launch the Visual Studio Code like so:

```
govind@thinkpad:~/poc/ethereum-truffle-kit$ cd client/
govind@thinkpad:~/poc/ethereum-truffle-kit/client$ code .
```

4. Open the terminal in the client container
5. Run the `npm start` command to launch the react development server.

   ```
   Compiled successfully!
   
   You can now view client in the browser.
   
   Local:            http://localhost:3000
   On Your Network:  http://172.23.0.5:3000
   
   Note that the development build is not optimized.
   To create a production build, use npm run build.
   
   webpack compiled successfully
   ```

## Cleanup Workspace

1. Go to `ethereum-truffle-kit` folder
2. Execute following command to remove all containers launched by the Visual Studio Code.

```
govind@thinkpad:~/poc/ethereum-truffle-kit$ ./clean.sh

```

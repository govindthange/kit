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
4. Open the command terminal inside client container
5. Backup all the contents of `/workspace/client/` folder. Call this backup `container-file-backup`.
6. Delete all the contents insideDApp `/workspace/client/` folder.
7. Run `create-react-app .` command inside the `/workspace/client/` folder.
    ```
    node ➜ /workspace/client $ create-react-app .

    Creating a new React app in /workspace/client.

    Installing packages. This might take a couple of minutes.
    Installing react, react-dom, and react-scripts with cra-template...


    added 1393 packages in 1m

    209 packages are looking for funding
    run `npm fund` for details

    Initialized a git repository.

    Installing template dependencies using npm...

    added 56 packages in 4s

    209 packages are looking for funding
    run `npm fund` for details
    Removing template package using npm...


    removed 1 package, and audited 1449 packages in 2s

    209 packages are looking for funding
    run `npm fund` for details

    6 high severity vulnerabilities

    To address all issues (including breaking changes), run:
    npm audit fix --force

    Run `npm audit` for details.

    Created git commit.

    Success! Created client at /workspace/client
    Inside that directory, you can run several commands:

    npm start
        Starts the development server.

    npm run build
        Bundles the app into static files for production.

    npm test
        Starts the test runner.

    npm run eject
        Removes this tool and copies build dependencies, configuration files
        and scripts into the app directory. If you do this, you can’t go back!

    We suggest that you begin by typing:

    cd /workspace/client
    npm start

    Happy hacking!
    ```
8. Restore locally saved contents of `container-file-backup` back to `/workspace/client/` folder.
9. Finally run the `npm start` command to launch the development server.
    ```
    Compiled successfully!

    You can now view client in the browser.

    Local:            http://localhost:3000
    On Your Network:  http://172.23.0.5:3000

    Note that the development build is not optimized.
    To create a production build, use npm run build.

    webpack compiled successfully
    ```
10. Your react client development environment is ready!
11. Run following command on terminal to install redux.
    ```
    node ➜ /workspace/client (master ✗) $ npm install react-redux@8.0.4 redux@4.2.0 --save

    added 7 packages, and audited 1460 packages in 3s

    209 packages are looking for funding
    run `npm fund` for details

    6 high severity vulnerabilities

    To address all issues (including breaking changes), run:
    npm audit fix --force

    Run `npm audit` for details.
    ```
12. Run following command on the terminal to integrate redux-toolkit:
    ```
    node ➜ /workspace/client (master ✗) $ npm install @reduxjs/toolkit@1.8.6 --save

    added 560 packages, removed 1009 packages, changed 353 packages, and audited 1453 packages in 13s

    209 packages are looking for funding
    run `npm fund` for details

    6 high severity vulnerabilities

    To address all issues (including breaking changes), run:
    npm audit fix --force

    Run `npm audit` for details.
    ```

## Cleanup Workspace

1. Go to `ethereum-kit` folder
2. Execute following command to remove all containers launched by the Visual Studio Code.

```
govind@thinkpad:~/poc/ethereum-kit$ ./clean.sh

```

# VS Code Container Kit

At present its very difficult to carry out application development in integrated mode for a microservices styled architecture where every microservice requires a separate development environment.

For instance, setting up a single workspace for coding services in python, java, and node.js all in a single environment is not possible. Developer must use separate IDEs and install all the necessary libraries on his machine

`VS Code Container Kit` attempts to solve this problem by using `VS Code Remote Plugin` along with devcontainer.json file to setup a development workspace using multiple docker containers to separately host different environment.

## Setup Workspace

1. Copy vscode-container-kit folder.
2. Launch the Visual Studio Code with Remote Container like so:

```
govind@thinkpad:~/poc/vscode-container-kit$ cd template-app/
govind@thinkpad:~/poc/vscode-container-kit/template-app$ code .
```

## Cleanup Workspace

1. Go to [vscode-container-kit] folder
2. Execute following command to remove all containers launched by the Visual Studio Code.

```
govind@thinkpad:~/poc/vscode-container-kit$ docker-compose -f ./docker-compose.prod.yml -f ./docker-compose.yml down

```

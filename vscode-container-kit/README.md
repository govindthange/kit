## Open Workspace

Launch the Visual Studio Code with Remote Container like so:

```
govind@thinkpad:~/poc/vscode-container-kit$ cd template-app/
govind@thinkpad:~/poc/vscode-container-kit/template-app$ code .
```

## Cleanup Workspace

- Go to [vscode-container-kit] folder
- Execute following command to remove all containers launched by the Visual Studio Code.

```
govind@thinkpad:~/poc/vscode-container-kit$ docker-compose -f ./docker-compose.prod.yml -f ./docker-compose.yml down

```
# Spring Boott Development Kit

## Step 1. Configure the environment settings

1. Take a git clone of `https://github.com/govindthange/kit.git`.
2. Open `spring-boot-kit` folder inside VS Code.
3. Open `.env` file and edit it as follows:
4. Set `PROJECT_DIR_IN_CONTAINER` to your project's folder where the spring-boot app will run. By default it will be the `server`.
5. Once everything is set, delete the `.git` folder so that you are no more linked to `https://github.com/govindthange/kit.git`
6. Rename the `spring-boot-kit` folder as per you application name.
7. Go to the newly renamed folder and do `git init` and commit all the files and push it to a new github repository.

## Step 2. Bring up the project containers

For the first execution run following script.

```
govind@thinkpad:~/projects/kit/spring-boot-kit$ ./setup.sh
```

For subsequent runs use following script
```
govind@thinkpad:~/projects/kit/spring-boot-kit$ ./run.sh
```

## Step 3. Setup the server environment for Java

1. Open your project folder in VS Code.
2. Once VS Code opens, click on [><] icon towards bottom left corner. This will prompt for options to open remote window.
3. Select `Attach to Running Container...`
4. Select the relevant from the running container list.
5. Once the VS Code opens if `server` folder is not automatically opened then open it. If there is a popup saying `Workspace does not exist` then hit [Open Workspace...] button and select `/server` folder.
6. Hit `Ctrl+Shift+P` key to open Command Palette, then type `>Tasks: Run Task` and select `Spring Boot Kit: Install All Recommended Extensions` from the list. Finallly select `Continue without scanning the task output` from the options. This will install all the recommended plugins configured in `extensions.json` and produce following output.
    ```
    > Executing task: jq -r '.recommendations[]' ./.vscode/extensions.json | xargs -L 1 code --install-extension <

    Installing extensions on Container spring-boot-kit-server (spring-boot-kit-server) @ desktop-linux...
    Installing extension 'vscjava.vscode-java-pack'...
    Extension 'vscjava.vscode-java-pack' v0.26.0 was successfully installed.
    Installing extensions on Container spring-boot-kit-server (spring-boot-kit-server) @ desktop-linux...
    Installing extension 'vmware.vscode-boot-dev-pack'...
    Extension 'vmware.vscode-boot-dev-pack' v0.2.1 was successfully installed.

    Terminal will be reused by tasks, press any key to close it.
    ```
7. Alternatively, if the above step doesn't work, open the terminal and execute `./.vscode/install-plugins.sh` script to install plugins like `Extension Pack for Java` from Microsoft (Identifer: vscjava.vscode-java-pack) and `Spring Boot Extension pack` from VMWare (Identifier: vmware.vscode-boot-dev-pack).
    ```
    root@c2343e8c3211:/server# ./.vscode/install-plugins.sh 
    Installing extensions on Container spring-boot-kit-server (spring-boot-kit-server) @ desktop-linux...
    Installing extension 'vscjava.vscode-java-pack'...
    Extension 'vscjava.vscode-java-pack' v0.26.0 was successfully installed.
    Installing extensions on Container spring-boot-kit-server (spring-boot-kit-server) @ desktop-linux...
    Installing extension 'vmware.vscode-boot-dev-pack'...
    Extension 'vmware.vscode-boot-dev-pack' v0.2.1 was successfully installed.
    root@c2343e8c3211:/server# 
    ```
8. Open `./src/main/java/kit/springboot/RunFunction.java` file and run it by hitting `▶️` icon at the right top corner. This button was added by the Java Extension Pack.

---

### FAQ

- [How to create and run Spring Boot projects in VS Code?](https://www.youtube.com/watch?v=RBmWIACTiKI)
- [How to boost productivity while working with Spring Boot apps in VS Code?](https://www.youtube.com/watch?v=XbpFSyeMYfg)

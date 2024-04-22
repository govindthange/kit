# Spring Boot Development Kit

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


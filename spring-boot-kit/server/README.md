# Development Environment Setup

Follow the instructions [here](../README.md) before setting up the development environment.

## Step 1. Wait for extensions to install

> By default, when you open the project's working directory (i.e. `server`), all the configured tasks in `.vscode/tasks.json` would automatically run and install extensions listed in the `.vscode/extensions.json` file.

__PLEASE WAIT!__ IT MAY TAKE A FEW MINUTES TO INSTALL ALL EXTENSIONS.

In order to explicitly invoke tasks do as follows:

1. Hit `Ctrl+Shift+P` key to open Command Palette.
2. Type `>Tasks: Run Task` on the command palette.
3. Select `Spring Boot Kit: Install All Recommended Extensions` task from the list.
4. Select `Continue without scanning the task output` from the available options. This will install all the recommended plugins configured in `extensions.json` and produce following output.
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

Alternatively, if the above step doesn't work, open the terminal and execute `./.vscode/install-plugins.sh` script to install plugins like `Extension Pack for Java` from Microsoft (Identifer: vscjava.vscode-java-pack) and `Spring Boot Extension pack` from VMWare (Identifier: vmware.vscode-boot-dev-pack).
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

## Step 2. Create a new project

1. Hit `Ctrl+Shift+P` key to open Command Palette.
2. Type `>Spring Initializr: Create a Maven Project...` on the command palette.
3. Configure `Spring Boot Version`, `Programming Langauge`, `Group Id`, `Artifact Id`, `Java Version` etc.
  - Set Group Id = com.example
  - Set Artifact Id = core
4. Manage dependencies by searching it on the command palette and adding it to the project.
5. Command palette will prompt to select a folder. Select `/server` which is our Spring Boot workspace folder.
6. Once everything is set, there will be a VS Code notification saying `Successfully generated. Location: /server/core`. Hit [Open] button to open the newly created project.

## Step 3. Run the application

Consider you create an application by the name `demo` w/ `com/example` as group Id

Open `./demo/src/main/java/com/example/DemoApplication.java` file and run it by hitting `▶️` icon at the right top corner. This button was added by the Java Extension Pack.

### Step 3.1. Add some code and test
[...](https://youtu.be/rsr6X5M6-6M?t=582)

Follow [these steps](https://spring.io/quickstart) to add some code.

```
package com.example.core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class CoreApplication {

  public static void main(String[] args) {
    SpringApplication.run(CoreApplication.class, args);
  }

  @GetMapping("/hello")
  public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
    return String.format("Hello %s!", name);
  }

}
```

### Step 3.2. Configure the port

By default, the embedded server starts on port 8080. To change this provide a different value in `src/main/resources/application.properties` file:

```
server.port=8081
```

Or do the same if you are using an `application.yml` file:

```
server:
  port : 8081
```

Both files are loaded automatically by Spring Boot if placed in the src/main/resources directory of a Maven application.

## Step 5. Navigate the application
[...](https://youtu.be/XbpFSyeMYfg?t=799)

1. Open any of your controller classes.


https://youtu.be/XbpFSyeMYfg?t=1249


## Step 6. Do some live code changes while debugging w/o restarting the app
[...](https://youtu.be/XbpFSyeMYfg?t=1152)

---

### FAQ

- [How to set java home path in VS Code's settings.json?](https://youtu.be/rsr6X5M6-6M?t=288)
- [How to create and run Spring Boot projects in VS Code?](https://www.youtube.com/watch?v=RBmWIACTiKI)
- [How to boost productivity while working with Spring Boot apps in VS Code?](https://www.youtube.com/watch?v=XbpFSyeMYfg)

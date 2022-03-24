# Jenkins Setup
[...](https://hub.docker.com/_/jenkins?tab=description)


## Pull Jenkins Image

```bash
govind@thinkpad-p15:~/poc/jenkins$ docker pull jenkins/jenkins
```


## Run Jenkins

```bash
govind@thinkpad-p15:~/poc$ docker run -p 8080:8080 -p 50000:50000 -v /home/govind/poc/jenkins/volume:/var/jenkins_home --name jenkins jenkins/jenkins
```


## Test Jenkins

1. Open `http://localhost:8080/`
2. Authenticate
   1. Copy password from the file `/var/jenkins_home/secrets/initialAdminPassword`
   2. Enter the password.
3. Install relevant plugins.
4. Test Internet Connection.
   1. Get the container name.
      ```bash
      govind@thinkpad-p15:~$ docker exec -it jenkins/jenkins /bin/bash
      Error: No such container: jenkins:2.60.3
      govind@thinkpad-p15:~$ docker container list
      CONTAINER ID   IMAGE            COMMAND                  CREATED          STATUS          PORTS                                                                                      NAMES
      dccedf2cb452   jenkin/jenkins   "/bin/tini -- /usr/l…"   31 minutes ago   Up 31 minutes   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp, 0.0.0.0:50000->50000/tcp, :::50000->50000/tcp   jenkins
      ```
   2. Ping to verify whether the docker container has direct access to  internet.
      ```bash
      govind@thinkpad-p15:~$ docker exec -it jenkins /bin/bash
      jenkins@dccedf2cb452:/$ ping 8.8.8.8
      PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
      64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=8.66 ms
      64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=8.24 ms
      64 bytes from 8.8.8.8: icmp_seq=3 ttl=117 time=10.2 ms
      ^C
      --- 8.8.8.8 ping statistics ---
      3 packets transmitted, 3 received, 0% packet loss, time 2003ms
      rtt min/avg/max/mdev = 8.244/9.052/10.245/0.864 ms
      jenkins@dccedf2cb452:/$ 
      ```
5. Resolution.
   - If there are issues with internet access then run jenkins docker image like so:
   ```bash
   govind@thinkpad-p15:~/poc/jenkins$ docker run -d --net host -v /home/govind/poc/jenkins/volume:/var/jenkins_home -t --name jenkins jenkins/jenkins
   ```


# Create Users

- usrename: devops
- password: devops


# Install Plugins

1. Go to Dashboard.
2. Select `Manage Jenkins`.
3. Select `Manage Plugins`.
4. Go to `Available` tab.
5. Select `Maven Integration plugin 3.18`.
6. Select `Oracle Java SE Development Kit Installer Plugin 1.5`.
7. Hit `Install without restart` button.

# Configure Global Tools

1. Go to `http://localhost:8080/configureTools/`.
2. This opens `Global Tool Conifguration`.
3. Go to `JDK` section.
4. Conifugre JDK.
   1. Specifiy JDK Name.
   2. Check on `Install automatically`.
   3. Select `Install Oracle Java SE Development Kit from the website`.
   4. Select version as `Java SE Development Kit 9.0.4`.
5. Configure Maven.
   1. Specify Maven Name.
   2. Check on `Install automatically`.
   3. Select `Install from Apache`.
   4. Select version as `3.8.5`.
6. Hit `Apply` and `Save` button.


# Create Project

1. Go to `Dashboard`.
2. Hit `New Item`.
3. Enter an item name as `hello-world-maven`.
4. Select `Freestyle project` option.
5. Go to `Source Code Management` tab.
6. Set `Repository URL` as `https://github.com/jabedhasan21/java-hello-world-with-maven.git`. This is just a sample repo.
7. Go to `Build` section.
8. Select `Inoke top-level Maven targets`.
9. Set `Goal` as `compile`.
10. Hit `Apply` and `Save` button.


# Create Build

1. Hit `Build Now` button on the left side menus.
2. Check the `Build History` panel on the bottom left.
3. Select `Console Output` from the build number drop down.
4. The console may show an error like so:
   - Your Oracle account doesn't appear valid. Please specify a valid username/password.
   - Hit the URL shown in error.
   - Enter your oracle credentials.
5. Reinitiate the build by hitting the `Build Now` button on the left side menus.
6. Select `Console Output` from the new build number drop down.


# Shutdown Jenkins

1. Go to `Dashboard`.
2. Select `Manage Jenkins`.
3. Go to bottom of the page and hit `Prepare for Shutdown` button.
   1. Specify reason for shutdown (say "Backup").
   1. Hit `Prpare for Shutdown` button.
   2. It will show a message as `Jenkins is going to shut down. Shut down reason: Backup`
4. Wait for a couple of minutes.
5. Hit the following URL: `http://localhost:8080/exit`
6. The page will show an error as `This URL requires POST` with a button as `Retry using POST`.
7. Hit `Retry using POST` button.



# Test

## Check connectivity between jenkins and ansible containers

#### Step 1. Start by obtaining the IP address of the ansible container. Use the docker inspect command to get the IP address.

```
govind@thinkpad:~$ docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' devops-ansible 
172.21.0.2
govind@thinkpad:~$ 

```

Take note of the IP address returned by this command.

#### Step 2. Enter jenkins container to test the connectivity.

Use the docker exec command to execute a command inside the container. You want to test connectivity from inside devops-jenkins container to devops-ansible container

```
govind@thinkpad:~$ docker exec -it devops-jenkins /bin/bash
jenkins@e5e16b328575:/$ whoami
jenkins
jenkins@e5e16b328575:/$ 
```

#### Step 3. Use curl to test connectivity to ansible container.

Once inside the jenkins container, you can use standard network troubleshooting tools like ping or curl to test connectivity to the target container.

```
jenkins@e5e16b328575:/$ curl 172.21.0.2
curl: (7) Failed to connect to 172.21.0.2 port 80: Connection refused
jenkins@e5e16b328575:/$ curl ansible
curl: (7) Failed to connect to ansible port 80: Connection refused
jenkins@e5e16b328575:/$ 
```

## SSH from devops-jenkins to devops-ansible container

```
govind@thinkpad:~$ docker exec -it devops-ansible /bin/bash
```

Do SSH (Note that ansible container's SSH port 22 is mapped to host's 8022)

```
ssh ansible@ansible -p 8022
```


---

References:
- [Resetting jenkins password from within container](https://upadhyaymanas3.medium.com/how-to-reset-jenkins-password-in-docker-containers-in-just-10-simple-steps-1370c049bbd7)


# Build docker image

Read steps on building [here](https://4sysops.com/archives/how-to-deploy-ansible-inside-a-docker-container/).

```
docker build -t ansible:latest .
```

# I. SSH from ansible container to target machines

Ansible uses SSH to connect to the managed hosts.

## Step 1. Setup SSH on target machine.

Inspect the Docker container to confirm if SSH is running by executing the following command:

```
ps aux | grep sshd
```

Or run the following command to check if the SSH service is running and listening on port 22:

```
netstat -tln | grep 22
```

If the output doesn't show any listening connections on port 22, it means SSH is not properly set up within the container.

> Follow instructions specified [here](https://github.com/govindthange/playbooks/tree/main/linux/ssh-server-setup) to setup SSH server.

## Step 2. Setup SSH in ansible container.

Ensure that SSH is properly configured on the target hosts, and the SSH keys or passwords are set up for authentication.

```
docker exec -it devops-ansible ps aux | grep sshd
```

Or Once inside the Ansible container, run the following command to check if the SSH service is running and listening on port 22:

```
netstat -tln | grep 22
```

If the output doesn't show any listening connections on port 22, it means SSH is not properly set up within the container.

> Follow instructions specified [here](https://github.com/govindthange/playbooks/blob/main/linux/ssh-key-based-authentication) to setup SSH key-based authentication. For detailed blog click [here](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-22-04).

#### Option 1.

Run `ssh-copy-id` command to send the keys to target machine. **Note that you need to perform this once for each user.**

```
$ ssh-copy-id govind@thinkpad
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/ansible/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
govind@thinkpad's password: 
Permission denied, please try again.
govind@thinkpad's password: 

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh 'govind@thinkpad'"
and check to make sure that only the key(s) you wanted were added.
```

#### Option 2.

**SSH Configuration**: You can also configure SSH options in the SSH client configuration file (`~/.ssh/config`) on the control node to simplify SSH connections. For example, you can set default SSH options for specific hosts, such as the SSH username and private key to use.

## Step 3. Test playbooks.

Check instructions for testing ansible and ansible-playbook commands [here](./test/README.md).

# II. SSH from jenkins container to ansible container

## Step 1. Start ssh inside ansible container

Run `service ssh restart`

```
govind@thinkpad:~$ docker exec -it devops-ansible /bin/bash
root@baacda756f60:/# service ssh restart
Restarting OpenBSD Secure Shell server: sshd.
```

## Step 2. Test ssh from jenkins container

Run `ssh admin@ansible`

```
govind@thinkpad:~$ docker exec -it devops-jenkins /bin/bash
root@7e1bd48e7cd8:/# ssh admin@ansible
admin@ansible's password: changeme
Linux baacda756f60 5.15.49-linuxkit-pr #1 SMP Thu May 25 07:17:40 UTC 2023 x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
admin@baacda756f60:~$ 
```
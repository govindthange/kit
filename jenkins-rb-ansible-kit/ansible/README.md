
# Build docker image

Read steps on building [here](https://4sysops.com/archives/how-to-deploy-ansible-inside-a-docker-container/).

```
docker build -t ansible:latest .
```

# Test

## Step 1. Setup `hosts` file

```
[servers]
192.9.200.244

[laptops]
thinkpad ansible_host=192.9.200.244
selfstart1 ansible_host=localhost
selfstart2 ansible_host=127.0.0.1
```

## Step 2. Configure SSH on target hosts

Ensure that SSH is properly configured on the target hosts, and the SSH keys or passwords are set up for authentication. Ansible uses SSH to connect to the managed hosts.

```
ansible -i /ansible/hosts -m ping thinkpad
ansible -i /ansible/hosts -m ping self
```

### Configuring SSH for Ansible

Ref: https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-on-ubuntu-22-04


1. **SSH Key-Based Authentication**: Ansible typically uses SSH key-based authentication to connect to the managed hosts. To set it up:

   - **Generate SSH Key Pair**: Generate an SSH key pair (public and private key) on your control node using the `ssh-keygen` command. If you already have an SSH key pair, you can skip this step.

   - **Copy Public Key**: Copy the public key (`id_rsa.pub` or another key file you generated) to the target hosts. You can use the `ssh-copy-id` command to copy the public key to the remote hosts. For example:
     ```
     ssh-copy-id user@host
     ```
     Replace `user` with the username on the target host and `host` with the hostname or IP address of the target host. You may need to enter the password for the remote user.

   - **Verify SSH Connection**: Test the SSH connection by manually SSH-ing into the target host from the control node. If the connection is successful without requiring a password, SSH key-based authentication is properly set up.

2. **SSH Configuration**: You can also configure SSH options in the SSH client configuration file (`~/.ssh/config`) on the control node to simplify SSH connections. For example, you can set default SSH options for specific hosts, such as the SSH username and private key to use. Here's an example `config` file entry:


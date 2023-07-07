# Instructions

## Setup `hosts` file in ansible container (the control machine).

```
[laptops]
target1 ansible_host=thinkpad ansible_user=govind ansible_connection=ssh
target2 ansible_host=192.9.200.244 ansible_user=govind ansible_connection=ssh
```

- `ansible_host` is the target machine for DU deployment.
- `ansible_user` is the ansible user i.e. your unix user.

## 1. Test ansible w/ ping

```
# ansible -i /test/hosts -m ping target1
target1 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
# ansible -i /test/hosts -m ping target2
target2 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
# 
```

## 2. Test `hellow-world.yml` playbook

```
# ansible-playbook -i /test/hosts hello-world.yml

PLAY [Echo] ********************************************************************************************************************************************************************************************************************************

TASK [Gathering Facts] *********************************************************************************************************************************************************************************************************************
ok: [target1]
ok: [target2]

TASK [Print debug message] *****************************************************************************************************************************************************************************************************************
ok: [target1] => {
    "msg": "Hello, world!"
}
ok: [target2] => {
    "msg": "Hello, world!"
}

PLAY RECAP *********************************************************************************************************************************************************************************************************************************
target1                    : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
target2                    : ok=2    changed=0    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   

# 
```

## 3. Test `run-remote-cmd.yml` playbook w/ password prompt

If you have the sudo password for the target hosts, you can provide it to Ansible using the --ask-become-pass option. This will prompt you to enter the sudo password during playbook execution.

```
# ansible-playbook -i /test/hosts run-remote-cmd.yml --ask-become-pass
BECOME password: 

PLAY [Run remote commands on target hosts using sudo password prompt] **********************************************************************************************************************************************************************

TASK [Gathering Facts] *********************************************************************************************************************************************************************************************************************
ok: [target2]
ok: [target1]

TASK [Run echo w/ sudo prompt] *************************************************************************************************************************************************************************************************************
changed: [target1]
changed: [target2]

PLAY RECAP *********************************************************************************************************************************************************************************************************************************
target1                    : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
target2                    : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0     
```

## 4. Test `run-remote-cmd-with-pwd.yml` playbook w/ --extra-vars option

In Ansible, you can pass the sudo password for privilege escalation directly in the playbook file using the ansible_become_pass variable.

Refer `./test/run-remote-cmd-with-pwd.yml`
- `ansible_become_pass` is a variable that holds the sudo password. It is defined under the vars section of the playbook.
- `{{ sudo_password }}` is the placeholder for the actual sudo password. You can replace it with the actual password value when running the playbook.

To run the playbook and provide the sudo password, you can use the --extra-vars option:

```
ansible-playbook -i /test/hosts run-remote-cmd-with-pwd.yml --extra-vars "sudo_password=<your_sudo_password>"

PLAY [Run remote commands on target hosts with sudo password through --extra-vars] *********************************************************************************************************************************************************

TASK [Gathering Facts] *********************************************************************************************************************************************************************************************************************
ok: [target2]
ok: [target1]

TASK [Run echo w/ password in --extra-vars] ************************************************************************************************************************************************************************************************
changed: [target1]
changed: [target2]

PLAY RECAP *********************************************************************************************************************************************************************************************************************************
target1                    : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   
target2                    : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0   

```

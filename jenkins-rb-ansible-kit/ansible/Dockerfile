FROM python:3.8

USER root
RUN echo 'root:changeme' | chpasswd && \
    adduser admin && echo 'admin:changeme' | chpasswd

RUN apt-get update && \
    apt-get install -y net-tools && \
    apt-get install -y iputils-ping && \
    apt-get update && apt-get install -y openssh-server && \
    apt-get update && apt-get install -y openssh-client sshpass && \
    pip install ansible

# Generate SSH key for the root
RUN ssh-keygen -t rsa -f /root/.ssh/id_rsa -q -N ""

# Generate SSH key for the admin
USER admin
RUN mkdir /home/admin/.ssh && ssh-keygen -q -t rsa -N '' -f /home/admin/.ssh/id_rsa

# Copy the Ansible agent configuration file
COPY ./config/ansible.cfg /home/ansible/.ansible.cfg

COPY ./config/ssh.cfg /etc/ssh/ssh_config
COPY ./config/sshd.cfg /etc/ssh/sshd_config

USER root
RUN service ssh restart

CMD ["/bin/bash"]

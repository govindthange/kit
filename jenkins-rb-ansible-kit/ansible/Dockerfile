FROM python:3.8

# Install dependencies
RUN apt-get update && \
    apt-get install -y net-tools && \
    apt-get install -y iputils-ping

# Install dependencies
RUN apt-get update && apt-get install -y openssh-server

RUN apt-get update && apt-get install -y \
    openssh-client \
    sshpass

# Install Ansible
RUN pip install ansible

# Create an Ansible user
RUN useradd -m ansible

# Generate SSH key for the Ansible user
USER ansible
RUN mkdir /home/ansible/.ssh && ssh-keygen -q -t rsa -N '' -f /home/ansible/.ssh/id_rsa

# Copy the Ansible agent configuration file
COPY ansible.cfg /home/ansible/.ansible.cfg

# Start the SSH service
USER root

# Use the chpasswd command to set the password for the root user 
RUN echo "root:root" | chpasswd

RUN service ssh start

# Set the working directory
WORKDIR /home/ansible

# Set the entrypoint command
USER ansible
CMD [ "ansible", "localhost", "-m", "ping" ]
# CMD ["ansible-playbook", "your_playbook.yml"]
# CMD ["/bin/bash"]

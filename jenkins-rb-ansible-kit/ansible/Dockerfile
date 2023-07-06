FROM python:3.8

# Install dependencies
RUN apt-get update && \
    apt-get install -y net-tools && \
    apt-get install -y iputils-ping


RUN apt-get update && apt-get install -y \
    openssh-client \
    sshpass

# Install Ansible
RUN pip install ansible

# Set the working directory
WORKDIR /ansible

# Set the entrypoint command
# CMD ["ansible-playbook", "your_playbook.yml"]
CMD ["/bin/bash"]
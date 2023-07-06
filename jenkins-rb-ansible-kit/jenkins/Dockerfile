FROM jenkins/jenkins

USER root

# Use the chpasswd command to set the password for the root user 
RUN echo "root:root" | chpasswd

# Install dependencies
RUN apt-get update && \
    apt-get install -y net-tools && \
    apt-get install -y iputils-ping

RUN apt-get update && apt-get install -y \
    openssh-client \
    sshpass

FROM jenkins/jenkins

USER root
RUN echo 'root:changeme' | chpasswd

# Install dependencies
RUN apt-get update && \
    apt-get install -y net-tools && \
    apt-get install -y iputils-ping && \
    apt-get update && apt-get install -y openssh-client sshpass


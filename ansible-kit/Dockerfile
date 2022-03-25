FROM ubuntu:bionic

# Install Ansible w/ its prerequisites
RUN apt-get update \
	&& apt-get install --yes software-properties-common \
	&& add-apt-repository --yes --update ppa:ansible/ansible \
	&& apt-get install --yes ansible

# Install tools for deploying and configuring nodes
RUN apt-get install --yes git openssh-server net-tools

# Copy your ansible configuration into the image
COPY test /test

# Run ansible to configure things
RUN ansible-playbook /test/playbook.yml


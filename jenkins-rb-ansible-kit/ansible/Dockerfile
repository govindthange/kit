FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive
ENV LANG=C.UTF-8

RUN apt-get update && \
    apt-get install -y gcc python-dev libkrb5-dev && \
    apt-get install -y python3-pip && \
    pip3 install --upgrade pip && \
    pip3 install --upgrade virtualenv

RUN pip3 install pywinrm[kerberos] && \
    apt-get install -y krb5-user && \
    pip3 install pywinrm && \
    pip3 install ansible

# RUN apt update && \
#     apt install python3.8 && \
#     sudo update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.8 1

RUN apt-get update && \
    apt-get install -y net-tools && \
    apt-get install -y iputils-ping

CMD ["/bin/bash"]

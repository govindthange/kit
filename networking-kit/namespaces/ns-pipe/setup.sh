#~/bin/bash

ip netns add red-ns
ip netns add blue-ns

ip link add red-veth type veth peer name blue-veth

ip link set dev red-veth netns red-ns
ip link set dev blue-veth netns blue-ns

ip -n red-ns link set lo up
ip -n blue-ns link set lo up

ip -n red-ns address add 192.168.15.1/24 dev red-veth
ip -n blue-ns address add 192.168.15.2/24 dev blue-veth

ip -n red-ns link set dev red-veth up
ip -n blue-ns link set dev blue-veth up

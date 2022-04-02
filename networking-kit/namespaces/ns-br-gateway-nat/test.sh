#~/bin/bash

echo "\n\nPing all network namespaces from host:"
ping -c 1 10.10.10.11
ping -c 1 10.10.10.12

echo "\n\nPing a namespace from another namespace:"
ip netns exec white-ns ping -c 1 10.10.10.11

echo "\n\nPing google's DNS to test default gateway:"
ip netns exec black-ns ping -c 1 8.8.8.8

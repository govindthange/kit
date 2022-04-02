#~/bin/bash

echo "Ping all network namespaces from host:"
ping -c 1 192.168.15.2
ping -c 1 192.168.15.3
ping -c 1 192.168.15.4
ping -c 1 192.168.15.5

echo "Ping a namespace from another namespace:"
ip netns exec blue-ns ping -c 1 192.168.15.5


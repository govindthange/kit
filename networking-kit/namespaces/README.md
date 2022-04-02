# Isolating networks w/ namespaces

Network namespaces provide isolation of the system resources associated with networking: network devices, IPv4 and IPv6 protocol stacks, IP routing tables, firewall rules, the /proc/net directory, the /sys/class/net directory, various files under /proc/sys/net, port numbers (sockets), and so on.

In this project I explored various techniques to establish communication between namespaces, communication between namespaces and host network, and communication between a namespace and external networks.

Step 1. Follow instructions in [./ns-pipe](./ns-pipe/) to establish communication between 2 namespaces with the help of a link/veth/pipe. 

Step 2. Follow instructions in [./ns-br](./ns-br) to establish communication between multiple namespaces with the help of a bridge or a virtual switch.

Step 3. Follow instructions in [./ns-br-gateway-nat](./ns-br-gateway-nat) to establish communication between namespaces and outside networks by configuring default gateway, NAT, and port forwarding rules.

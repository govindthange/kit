#~/bin/bash

# Step 1. Setup a bridge/vSwitch
ip link add colorful-bridge type bridge
ip addr add 192.168.15.1/24 brd + dev colorful-bridge
ip link set dev colorful-bridge up

# Step 2. Create namespaces
ip netns add red-ns
ip netns add blue-ns
ip netns add green-ns
ip netns add orange-ns

# Step 3. Create 1 link per namespace
ip link add red-veth type veth peer name red-veth-br
ip link add blue-veth type veth peer name blue-veth-br
ip link add orange-veth type veth peer name orange-veth-br
ip link add green-veth type veth peer name green-veth-br

# Step 4. Connect namespaces to bridge using links

# Step 4.1. Connect one end of link to their respective namespaces
ip link set red-veth netns red-ns
ip link set blue-veth netns blue-ns
ip link set orange-veth netns orange-ns
ip link set green-veth netns green-ns

# Step 4.2. Connect other end of the links to bridge
ip link set red-veth-br master colorful-bridge
ip link set blue-veth-br master colorful-bridge
ip link set green-veth-br master colorful-bridge
ip link set orange-veth-br master colorful-bridge

# Step 5. Assign IP addresses to all interfaces
ip -n red-ns addr add 192.168.15.2/24 dev red-veth
ip -n blue-ns addr add 192.168.15.3/24 dev blue-veth
ip -n orange-ns addr add 192.168.15.4/24 dev orange-veth
ip -n green-ns addr add 192.168.15.5/24 dev green-veth

# Step 6. Bring up the interfaces
ip -n red-ns link set red-veth up
ip -n blue-ns link set blue-veth up
ip -n orange-ns link set orange-veth up
ip -n green-ns link set green-veth up

ip netns exec red-ns ip link set dev lo up
ip netns exec blue-ns ip link set dev lo up
ip netns exec orange-ns ip link set dev lo up
ip netns exec green-ns ip link set dev lo up

ip link set red-veth-br up
ip link set blue-veth-br up
ip link set orange-veth-br up
ip link set green-veth-br up


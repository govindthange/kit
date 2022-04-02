#~/bin/bash

# Step 1. Delete links
sudo ip link del red-veth-br
sudo ip link del blue-veth-br
sudo ip link del orange-veth-br
sudo ip link del green-veth-br

# Step 2. Delete namespaces
sudo ip netns del red-ns
sudo ip netns del blue-ns
sudo ip netns del green-ns
sudo ip netns del orange-ns

# Step 3. Delete the bridge/vSwitch
sudo ip link del colorful-bridge

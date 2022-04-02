#~/bin/bash

sudo ip netns exec red-ns ip link del red-veth

sudo ip netns del red-ns
sudo ip netns del blue-ns
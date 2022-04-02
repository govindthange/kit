#!/bin/bash

# Making use of the `ip` command from the `iproute2` 
# package we're able to create the namespaces.
#
# By convention, network namespace handles created by
# iproute2 live under `/var/run/netns` (although they
# could live somewhere, like `docker` does with its
# namespaces - /var/run/docker/netns`).
ip netns add black-ns
ip netns add white-ns


# List all the interfaces with their corresponding
# configurations.
#
# We can verify that inside the namespace, only the
# loopback interface has been set.
ip netns exec black-ns \
        ip address show

# Create the two pairs.
# These pairs act as tunnels between the namespaces
# (for instance, black-ns and the default namespace).
ip link add black-veth type veth peer name black-veth-br
ip link add white-veth type veth peer name white-veth-br

# Associate the non `br-` side
# with the corresponding namespace
ip link set black-veth netns black-ns
ip link set white-veth netns white-ns

# Differently from before, now we see the
# extra interface (black-veth) that we just added.
ip netns exec black-ns \
        ip address show


# Assign the address 10.10.10.11 with netmask 255.255.255.0
# (see the `/24` mask there) to `black-veth`.
ip netns exec black-ns \
        ip addr add 10.10.10.11/24 dev black-veth

# Verify that the ip address has been set.
ip netns exec black-ns \
        ip address show

# Repeat the process, assigning the address 10.10.10.12 with 
# netmask 255.255.255.0 to `white-veth`.
ip netns exec white-ns \
        ip addr add 10.10.10.12/24 dev white-veth

# Create the bridge device naming it `gray-bridge`
# and set it up:
ip link add name gray-bridge type bridge
ip link set gray-bridge up

# Check that the device has been created.
ip link | grep gray-bridge

# Set the bridge veths from the default
# namespace up.
ip link set black-veth-br up
ip link set white-veth-br up

# Set the veths from the namespaces up too.
ip netns exec black-ns \
        ip link set black-veth up
ip netns exec white-ns \
        ip link set white-veth up

# Add the br-veth* interfaces to the bridge
# by setting the bridge device as their master.
ip link set black-veth-br master gray-bridge
ip link set white-veth-br master gray-bridge

# Check that the bridge is the master of the two
# interfaces that we set (i.e., that the two interfaces
# have been added to it).
bridge link show gray-bridge

# Set the address of the `gray-bridge` interface (bridge device)
# to 10.10.10.10/24 and also set the broadcast address
# to 10.10.10.255 (the `+` symbol sets  the host bits to
# 255).
ip addr add 10.10.10.10/24 brd + dev gray-bridge

# Execute the command to add the default gateway in all
# the network namespaces under `/var/run/netns`.
#
# The command is going to add a default gateway which should
# be used for all connections that doesn't match the other
# specific routes. 
#
# 10.10.10.10 corresponds to the address assigned to the
# bridge device - reachable from both namespaces, as well as
# the host machine.
ip -all netns exec \
        ip route add default via 10.10.10.10

# Check how the routing table looks inside the namespace
ip netns exec black-ns \
        ip route

# -t specifies the table to which the commands
# should be directed to. By default it's `filter`.
#
# -A specifies that we're appending a rule to the
# chain the we tell the name after it;
#
# -s specifies a source address (with a mask in this case).
#
# -j specifies the target to jump to (what action to take).
iptables \
        -t nat \
        -A POSTROUTING \
        -s 10.10.10.0/24 \
        -j MASQUERADE


# Enable ipv4 ip forwarding
sysctl -w net.ipv4.ip_forward=1

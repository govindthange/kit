#!/bin/bash

ip link del black-veth-br
ip link del white-veth-br
ip link del gray-bridge

ip netns del black-ns
ip netns del white-ns

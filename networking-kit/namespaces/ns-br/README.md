# Connecting multiple namespaces via bridge/vSwitch


## Step 1. Setup a bridge/vSwitch

### Step 1.1. Create a bridge

```
govind@thinkpad-p15:~$ sudo ip link add colorful-bridge type bridge
```

### Step 1.2. Assign an IP address w/ subnet mask & broadcast address

```
govind@thinkpad-p15:~$ sudo ip addr add 192.168.15.1/24 brd + dev colorful-bridge
```

### Step 1.3. Bring up the bridge

```
govind@thinkpad-p15:~$ sudo ip link set dev colorful-bridge up
```

### Step 1.4. Verify routing table

```
govind@thinkpad-p15:~$ sudo route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         _gateway        0.0.0.0         UG    600    0        0 wlp0s20f3
link-local      0.0.0.0         255.255.0.0     U     1000   0        0 wlp0s20f3
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
192.168.1.0     0.0.0.0         255.255.255.0   U     600    0        0 wlp0s20f3
192.168.15.0    0.0.0.0         255.255.255.0   U     0      0        0 colorful-bridge
```


## Step 2. Create namespaces

```
govind@thinkpad-p15:~$ sudo ip netns add red-ns
govind@thinkpad-p15:~$ sudo ip netns add blue-ns
govind@thinkpad-p15:~$ sudo ip netns add green-ns
govind@thinkpad-p15:~$ sudo ip netns add orange-ns

```

Verify the namespaces.

```
govind@thinkpad-p15:~$ sudo ip netns
blue-ns
red-ns
orange-ns
green-ns
```


## Step 3. Create 1 link per namespace

```
govind@thinkpad-p15:~$ sudo ip link add red-veth type veth peer name red-veth-br
govind@thinkpad-p15:~$ !!:gs/red/blue
sudo ip link add blue-veth type veth peer name blue-veth-br
govind@thinkpad-p15:~$ !!:gs/blue/orange
sudo ip link add orange-veth type veth peer name orange-veth-br
govind@thinkpad-p15:~$ !!:gs/orange/green
sudo ip link add green-veth type veth peer name green-veth-br
```


## Step 4. Connect namespaces to bridge using links

### Step 4.1. Connect one end of link to their respective namespaces

```
govind@thinkpad-p15:~$ sudo ip link set red-veth netns red-ns
govind@thinkpad-p15:~$ !!:gs/red/blue
sudo ip link set blue-veth netns blue-ns
govind@thinkpad-p15:~$ !!:gs/blue/orange
sudo ip link set orange-veth netns orange-ns
govind@thinkpad-p15:~$ !!:gs/orange/green
sudo ip link set green-veth netns green-ns
```

Verify that all the virtual interfaces that are now associated with the namespace will no longer be visible from the host network.

```
govind@thinkpad-p15:~$ sudo ip link
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: enp0s31f6: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc fq_codel state DOWN mode DEFAULT group default qlen 1000
    link/ether 38:f3:ab:31:2a:8b brd ff:ff:ff:ff:ff:ff
3: wlp0s20f3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000
    link/ether 38:fc:98:3d:08:d8 brd ff:ff:ff:ff:ff:ff
4: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default 
    link/ether 02:42:47:4e:ad:f6 brd ff:ff:ff:ff:ff:ff
9: colorful-bridge: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/ether d2:14:86:63:a9:b4 brd ff:ff:ff:ff:ff:ff
12: red-veth-br@if13: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether aa:74:d4:f1:7b:1e brd ff:ff:ff:ff:ff:ff link-netns red-ns
14: blue-veth-br@if15: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 52:95:e7:39:ea:21 brd ff:ff:ff:ff:ff:ff link-netns blue-ns
16: orange-veth-br@if17: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 1e:36:dc:0d:2c:05 brd ff:ff:ff:ff:ff:ff link-netns orange-ns
18: green-veth-br@if19: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether fa:a1:a8:7c:98:34 brd ff:ff:ff:ff:ff:ff link-netns green-ns
```

### Step 4.2. Connect other end of the links to bridge

```
govind@thinkpad-p15:~$ sudo ip link set red-veth-br master colorful-bridge
govind@thinkpad-p15:~$ !!:gs/red/blue
sudo ip link set blue-veth-br master colorful-bridge
govind@thinkpad-p15:~$ !!:gs/blue/green
sudo ip link set green-veth-br master colorful-bridge
govind@thinkpad-p15:~$ !!:gs/green/orange
sudo ip link set orange-veth-br master colorful-bridge
```


## Step 5. Assign IP addresses to all interfaces

```
govind@thinkpad-p15:~$ sudo ip -n red-ns addr add 192.168.15.2/24 dev red-veth
govind@thinkpad-p15:~$ sudo ip -n blue-ns addr add 192.168.15.3/24 dev blue-veth
govind@thinkpad-p15:~$ sudo ip -n orange-ns addr add 192.168.15.4/24 dev orange-veth
govind@thinkpad-p15:~$ sudo ip -n green-ns addr add 192.168.15.5/24 dev green-veth
```


## Step 6. Bring up the interfaces

```
govind@thinkpad-p15:~$ sudo ip -n red-ns link set red-veth up
govind@thinkpad-p15:~$ !!:gs/red/blue
sudo ip -n blue-ns link set blue-veth up
govind@thinkpad-p15:~$ !!:gs/blue/orange
sudo ip -n orange-ns link set orange-veth up
govind@thinkpad-p15:~$ !!:gs/orange/green
sudo ip -n green-ns link set green-veth up
```


Bring up the loop back interfaces. ==<-- Not Verified==

```
sudo ip netns exec red-ns ip link set dev lo up
sudo ip netns exec blue-ns ip link set dev lo up
sudo ip netns exec orange-ns ip link set dev lo up
sudo ip netns exec green-ns ip link set dev lo up
```

Also explicitly bring up the bridge side of interfaces.

```
govind@thinkpad-p15:~$ sudo ip link set red-veth-br up
govind@thinkpad-p15:~$ ^red^blue
sudo ip link set blue-veth-br up
govind@thinkpad-p15:~$ ^blue^orange
sudo ip link set orange-veth-br up
govind@thinkpad-p15:~$ ^orange^green
sudo ip link set green-veth-br up
```


## Step 7. Verify Route & ARP tables

Verify routes.

```
dev@node:~/networking$ sudo ip netns exec red-ns route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.15.0    0.0.0.0         255.255.255.0   U     0      0        0 red-veth
dev@node:~/networking$ sudo ip netns exec red-ns ip route
192.168.15.0/24 dev red-veth proto kernel scope link src 192.168.15.2
```

Verify ARP tables.

```
dev@node:~/networking$ sudo ip netns exec red-ns arp
Address                  HWtype  HWaddress           Flags Mask            Iface
192.168.15.1             ether   1e:fc:8b:77:7c:b2   C                     red-veth
dev@node:~/networking$ sudo ip netns exec blue-ns arp
Address                  HWtype  HWaddress           Flags Mask            Iface
192.168.15.5             ether   36:75:30:f4:80:1c   C                     blue-veth
192.168.15.1             ether   1e:fc:8b:77:7c:b2   C                     blue-veth
dev@node:~/networking$ sudo ip netns exec orange-ns arp
Address                  HWtype  HWaddress           Flags Mask            Iface
192.168.15.1             ether   1e:fc:8b:77:7c:b2   C                     orange-veth
dev@node:~/networking$ sudo ip netns exec green-ns arp
Address                  HWtype  HWaddress           Flags Mask            Iface
192.168.15.1             ether   1e:fc:8b:77:7c:b2   C                     green-veth
192.168.15.3             ether   32:51:3e:92:d2:3d   C                     green-veth

```


## Step 8. Test

Test by pinging one of the namespace IPs from the host.

```
dev@node:~/networking$ ping 192.168.15.3
PING 192.168.15.3 (192.168.15.3) 56(84) bytes of data.
64 bytes from 192.168.15.3: icmp_seq=1 ttl=64 time=0.464 ms
64 bytes from 192.168.15.3: icmp_seq=2 ttl=64 time=0.041 ms
64 bytes from 192.168.15.3: icmp_seq=3 ttl=64 time=0.078 ms
^C
--- 192.168.15.3 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2011ms
rtt min/avg/max/mdev = 0.041/0.194/0.464/0.191 ms
```

Test by pinging one of the namespace IPs from another namespace.

```
dev@node:~/networking$ sudo ip netns exec orange-ns ping 192.168.15.3
PING 192.168.15.3 (192.168.15.3) 56(84) bytes of data.
64 bytes from 192.168.15.3: icmp_seq=1 ttl=64 time=0.143 ms
64 bytes from 192.168.15.3: icmp_seq=2 ttl=64 time=0.036 ms
64 bytes from 192.168.15.3: icmp_seq=3 ttl=64 time=0.253 ms
^C
--- 192.168.15.3 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2029ms
rtt min/avg/max/mdev = 0.036/0.144/0.253/0.088 ms

```

## Step 9. Clear

Delete all the virtual interfaces.

```
govind@thinkpad-p15:~$ sudo ip link del red-veth-br
govind@thinkpad-p15:~$ ^red^blue
sudo ip link del blue-veth-br
govind@thinkpad-p15:~$ ^blue^orange
sudo ip link del orange-veth-br
govind@thinkpad-p15:~$ ^orange^green
sudo ip link del green-veth-br

```

Delete the bridge.

```
govind@thinkpad-p15:~$ sudo ip link del colorful-bridge
```

Delete all namespaces.

```
govind@thinkpad-p15:~$ sudo ip netns
blue-ns (id: 1)
red-ns (id: 0)
orange-ns (id: 2)
green-ns (id: 3)

govind@thinkpad-p15:~$ sudo ip netns del red-ns
govind@thinkpad-p15:~$ sudo ip netns del blue-ns
govind@thinkpad-p15:~$ sudo ip netns del orange-ns
govind@thinkpad-p15:~$ sudo ip netns del green-ns
```


---

# Test

1. Setup environment with `$ ./setup.sh`
2. Test the environment with `$ ./test.sh`
3. Clean all changes with `$ ./clean.sh`

# Connecting 2 namespaces via pipe

A virtual interface (AKA pipe) provide a virtualized representation of a physical network interface.

## Step 1.  Create namespaces

Create 2 namespaces as `red-ns` and `blue-ns`

```
govind@thinkpad-p15:~$ sudo ip netns add red-ns
govind@thinkpad-p15:~$ sudo ip netns add blue-ns
```

Verify the namespaces.

```
govind@thinkpad-p15:~$ sudo ip netns
blue-ns
red-ns
```


## Step 2. Create a link

Create a link and name its two ends as `red-veth` and `blue-veth`

```
govind@thinkpad-p15:~$ sudo ip link add red-veth type veth peer name blue-veth
```

Verify that the 2 veth interfaces are being shown in the host machine.

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
5: blue-veth@red-veth: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether 4e:8e:45:82:93:98 brd ff:ff:ff:ff:ff:ff
6: red-veth@blue-veth: <BROADCAST,MULTICAST,M-DOWN> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether ee:c9:72:4a:2a:e0 brd ff:ff:ff:ff:ff:ff
```


## Step 3. Connect namespaces using link

Attach `red-veth` to `red-ns` and `blue-veth` to `blue-ns`

```
govind@thinkpad-p15:~$ sudo ip link set red-veth netns red-ns
govind@thinkpad-p15:~$ sudo ip link set blue-veth netns blue-ns
```

Verify that now the two veth interfaces are no more visible in the host machine.

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
```

Verify that the two veth interfaces can be seen in their respective namespaces.

```
govind@thinkpad-p15:~$ sudo ip -n red-ns link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
8: red-veth@if7: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether d6:64:bb:0e:40:04 brd ff:ff:ff:ff:ff:ff link-netns blue-ns


govind@thinkpad-p15:~$ sudo ip -n blue-ns link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
7: blue-veth@if8: <BROADCAST,MULTICAST> mtu 1500 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/ether fe:a9:76:c8:87:e2 brd ff:ff:ff:ff:ff:ff link-netns red-ns

```


## Step 4. Assign IP addresses to both interfaces

#### Approach 1. Use CIDR notation

Use CIDR notation to assign IP addresses along with subnet masks

```
govind@thinkpad-p15:~$ sudo ip -n red-ns addr add 192.168.15.1/24 dev red-veth
govind@thinkpad-p15:~$ sudo ip -n blue-ns addr add 192.168.15.2/24 dev blue-veth
```

When you specify netmask via CIDR a default gateway is automatically set.

```
govind@thinkpad-p15:~$ sudo ip netns exec red-ns route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.15.0    0.0.0.0         255.255.255.0   U     0      0        0 red-veth
govind@thinkpad-p15:~$ sudo ip netns exec red-ns arp
Address                  HWtype  HWaddress           Flags Mask            Iface
192.168.15.2             ether   4e:8e:45:82:93:98   C                     red-veth
```

#### Approach 2. Use IPv4 notation ==<< Need to verify==

Set an IP address w/o CIDR notation.

```
govind@thinkpad-p15:~$ sudo ip -n red-ns addr add 192.168.15.1 dev red-veth
govind@thinkpad-p15:~$ sudo ip -n blue-ns addr add 192.168.15.2 dev blue-veth
```

Verify that no gateway is set by default.

```
govind@thinkpad-p15:~$ sudo ip netns exec red-ns route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface

```

Explicitly set a default gateway like so:

```
$ ip netns exec red-ns ip route add default via 192.168.1.1 dev red-veth
```

#### Approach 3. Use CIDR notation w/ ifconfig ==<< Need to verify==

```
$ ip netns exec red-ns ifconfig red-veth 192168.15.1/24
```


## Step 5. Bring up the interfaces

Ensure that all the interfaces are up.

```
govind@thinkpad-p15:~$ sudo ip -n red-ns link set dev red-veth up
govind@thinkpad-p15:~$ sudo ip -n blue-ns link set dev blue-veth up
```


## Step 6. Verify Route & ARP tables

```
govind@thinkpad-p15:~$ sudo ip netns exec red-ns route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.15.0    0.0.0.0         255.255.255.0   U     0      0        0 red-veth
govind@thinkpad-p15:~$ sudo ip netns exec red-ns arp
Address                  HWtype  HWaddress           Flags Mask            Iface
192.168.15.2             ether   4e:8e:45:82:93:98   C                     red-veth
govind@thinkpad-p15:~$ sudo ip netns exec blue-ns route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
192.168.15.0    0.0.0.0         255.255.255.0   U     0      0        0 blue-veth
govind@thinkpad-p15:~$ sudo ip netns exec blue-ns arp
Address                  HWtype  HWaddress           Flags Mask            Iface
192.168.15.1             ether   ee:c9:72:4a:2a:e0   C                     blue-veth
```


## Step 7. Test

```
govind@thinkpad-p15:~$ sudo ip netns exec red-ns ping 192.168.15.2
PING 192.168.15.2 (192.168.15.2) 56(84) bytes of data.
64 bytes from 192.168.15.2: icmp_seq=1 ttl=64 time=0.038 ms
64 bytes from 192.168.15.2: icmp_seq=2 ttl=64 time=0.060 ms
64 bytes from 192.168.15.2: icmp_seq=3 ttl=64 time=0.058 ms
64 bytes from 192.168.15.2: icmp_seq=4 ttl=64 time=0.059 ms
64 bytes from 192.168.15.2: icmp_seq=5 ttl=64 time=0.059 ms
64 bytes from 192.168.15.2: icmp_seq=6 ttl=64 time=0.057 ms
^C
--- 192.168.15.2 ping statistics ---
6 packets transmitted, 6 received, 0% packet loss, time 5116ms
rtt min/avg/max/mdev = 0.038/0.055/0.060/0.007 ms
```


## Step 8. Clear everything

Delete link by using one of the interface names.

```
govind@thinkpad-p15:~$ sudo ip -n red-ns link del dev red-veth
```

As you delete one interface (say red-veth), the other end of the link (i.e. blue-veth) automatically gets deleted.

```
govind@thinkpad-p15:~$ sudo ip -n red-ns link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
govind@thinkpad-p15:~$ sudo ip -n blue-ns link
1: lo: <LOOPBACK> mtu 65536 qdisc noop state DOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
```

Finally delete both the namespaces.

```
govind@thinkpad-p15:~$ sudo ip netns del red-ns
govind@thinkpad-p15:~$ sudo ip netns del blue-ns
```


---

# Test

1. Setup environment with `$ ./setup.sh`
2. Test with `$ ./test.sh`
3. Clean all changes with `$ ./clean.sh`

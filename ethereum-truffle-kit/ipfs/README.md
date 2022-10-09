 # IPFS

 IPFS is a de-centralized file and web hosting protocol founded on ideals of freedom and openness.

# Check IPFS Container

Use `docker container ls` to list all containers.

```
govind@thinkpad:~$ docker container ls --format "table {{.ID}}\t{{.Image}}\t{{.Names}}"
CONTAINER ID   IMAGE                             NAMES
e8861270cf84   ethereum-truffle-kit_client      dapp-client
3ebd8cba097a   ethereum-truffle-kit_dapp         dapp
1eeeab327e73   ipfs/go-ipfs:latest               dapp-ipfs
5b526f3fa04a   trufflesuite/ganache-cli:latest   dapp-blockchain
```

- Confirm that the `dapp-ipfs` container is up!
- Note down the container ID of `dapp-ipfs`.
	- The `dapp-ipfs` container ID is `1eeeab327e73`
	- We will need this ID while uploading files via console.

# Test IPFS Web Console

You can view the web console on your local node by opening following URL on browser.

http://localhost:5001/webui


# Test IPFS File Upload

1. Create a sample file.

    ```
    govind@thinkpad:~/kit/ethereum-truffle-kit/ipfs$ echo "Hello World!" > ./export/hello-world
    ```

2. Upload the above created sample file to `1eeeab327e73` which is our `dapp-ipfs` container.

    Use `ipfs add <file-name>` to upload the file.

    ```
    govind@thinkpad:~/kit/ethereum-truffle-kit/ipfs$ docker exec 1eeeab327e73 ipfs add /ipfs/export/hello-world
    13 B / 13 B  100.00%added QmfM2r8seH2GiRaC4esTjeraXEachRt8ZsSeGaWTPLyMoG hello-world
    ```

3. Note the CID returned by IPFS.
	- It is `QmfM2r8seH2GiRaC4esTjeraXEachRt8ZsSeGaWTPLyMoG`
	- A content identifier, or CID, is a label used to point to material in IPFS.
	- It doesn't indicate where the content is stored, but it forms a kind of address based on the content itself.

4. Use `ipfs cat /ipfs/<cid>` to print the file on console.

	```
	govind@thinkpad:~/kit/ethereum-truffle-kit/ipfs$ docker exec 1eeeab327e73 ipfs cat /ipfs/QmfM2r8seH2GiRaC4esTjeraXEachRt8ZsSeGaWTPLyMoG
	Hello World!
	```

5. Open the following URL to see the file on browser:

    http://127.0.0.1:8080/ipfs/QmfM2r8seH2GiRaC4esTjeraXEachRt8ZsSeGaWTPLyMoG


# Print IPFS Swarm Peers

Use `ipfs swarm peers` command to print swarm peers like so:

```
govind@thinkpad:~$ docker exec 1eeeab327e73 ipfs swarm peers
/ip4/100.42.78.224/udp/4001/quic/p2p/12D3KooWQZuLdXi6SuJFqrZ4wueLFMEZNhGFYwz3LYbLb4fb7Yy3
/ip4/101.35.193.14/udp/4001/quic/p2p/12D3KooWSLtNEd8VG2JDFg5MASUyxtX8jFdcMnfKcqevj3G1f5om
/ip4/104.248.243.115/tcp/4001/p2p/12D3KooWCip72qkZ2GYpEpt2L1NjjkejqkYuW2JYwM8FEqLmQToy
/ip4/110.251.156.84/udp/9606/quic/p2p/12D3KooWPW3m8DnvtKh5Zg3a87itMGVkYx4qjfaePUqocfm56YEA
/ip4/111.167.20.172/udp/40133/quic/p2p/12D3KooWMeQe1TjiF1YRKxgwuJw3bUSTCFyA4o4AQijH7poDPKuo
```


# Print IPFS Details

Use `ipfs id` command to print IPFS information like so:

```
govind@thinkpad:~$ docker exec 1eeeab327e73 ipfs id
{
	"ID": "12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
	"PublicKey": "CAESIKki7DyKBQK3II4xLfLVhIWbYzHQOMYUSd+ngSeNwygO",
	"Addresses": [
		"/ip4/127.0.0.1/tcp/4001/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip4/127.0.0.1/udp/4001/quic/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip4/172.19.0.4/tcp/4001/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip4/172.19.0.4/udp/4001/quic/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip4/35.213.145.204/tcp/4001/p2p/12D3KooWBV4Nj38zuJ1D1pfix4NSAX1cbyLpfSrKDxQVdBtgFLdm/p2p-circuit/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip4/35.213.145.204/udp/4001/quic/p2p/12D3KooWBV4Nj38zuJ1D1pfix4NSAX1cbyLpfSrKDxQVdBtgFLdm/p2p-circuit/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip4/88.99.89.158/tcp/4001/p2p/12D3KooWCgCBE1yrA6ouqsh5E1jFN9Sh9CzxRCDL6Y9Ha91VCfbo/p2p-circuit/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip4/88.99.89.158/udp/4001/quic/p2p/12D3KooWCgCBE1yrA6ouqsh5E1jFN9Sh9CzxRCDL6Y9Ha91VCfbo/p2p-circuit/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip6/2a01:4f8:141:14f9::2/tcp/4001/p2p/12D3KooWCgCBE1yrA6ouqsh5E1jFN9Sh9CzxRCDL6Y9Ha91VCfbo/p2p-circuit/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip6/2a01:4f8:141:14f9::2/udp/4001/quic/p2p/12D3KooWCgCBE1yrA6ouqsh5E1jFN9Sh9CzxRCDL6Y9Ha91VCfbo/p2p-circuit/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip6/64:ff9b::23d5:91cc/tcp/4001/p2p/12D3KooWBV4Nj38zuJ1D1pfix4NSAX1cbyLpfSrKDxQVdBtgFLdm/p2p-circuit/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip6/64:ff9b::5863:599e/tcp/4001/p2p/12D3KooWCgCBE1yrA6ouqsh5E1jFN9Sh9CzxRCDL6Y9Ha91VCfbo/p2p-circuit/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP",
		"/ip6/64:ff9b::5863:599e/udp/4001/quic/p2p/12D3KooWCgCBE1yrA6ouqsh5E1jFN9Sh9CzxRCDL6Y9Ha91VCfbo/p2p-circuit/p2p/12D3KooWMCbxNzyfKhmqngAh3jf7dUBNjs4gLkFn56Ft9R7Q32sP"
	],
	"AgentVersion": "kubo/0.16.0/38117db/docker",
	"ProtocolVersion": "ipfs/0.1.0",
	"Protocols": [
		"/ipfs/bitswap",
		"/ipfs/bitswap/1.0.0",
		"/ipfs/bitswap/1.1.0",
		"/ipfs/bitswap/1.2.0",
		"/ipfs/id/1.0.0",
		"/ipfs/id/push/1.0.0",
		"/ipfs/lan/kad/1.0.0",
		"/ipfs/ping/1.0.0",
		"/libp2p/autonat/1.0.0",
		"/libp2p/circuit/relay/0.1.0",
		"/libp2p/circuit/relay/0.2.0/stop",
		"/libp2p/dcutr",
		"/p2p/id/delta/1.0.0",
		"/x/"
	]
}
```

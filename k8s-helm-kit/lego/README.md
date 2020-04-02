# Lego

Lego is a microservice styled distributed system that illustrates various ways of enabling communication in a clustered environment.

### ClusterIP
Allowing inter-service communication within a clustered environment.

### NodePort Service
Allowing external clients to access services running inside a cluster.

![Output](./images/k8s-lego-node-port.png)


### Headless Services
Allowing external clients to directly access pods inside a cluster.

### Ingress Service
Allowing external clients to access services running inside a cluster.
* Using manually managed end points
* Using Alias (spec.type=ExternalName)

![Output](./images/k8s-lego-node-ingress.png)

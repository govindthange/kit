# Lego

Lego is a microservice styled distributed system that illustrates following aspects of a kubernetes deployment

### ClusterIP
Allowing inter-service communication within a clustered environment.

### NodePort Service
Allowing external clients to access services running inside a cluster.

### Headless Services
Allowing external clients to directly access pods inside a cluster.

### Ingress Service
Allowing external clients to access services running inside a cluster.
* Using manually managed end points
* Using Alias (spec.type=ExternalName)

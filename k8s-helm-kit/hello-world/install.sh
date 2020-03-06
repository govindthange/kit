#!/usr/bin/env bash

# Configure application information
PROJECT_ID=my-kubernetes-project-268407
APP_NAME=hello-world
RELEASE_NAME=pre-alpha
CLUSTER_NAME=$APP_NAME-gke
CLUSTER_REGION=asia-south1-a
NAMESPACE=$APP_NAME-ns

# Configure GCP
gcloud config set project $PROJECT_ID

# Connect to your Kubernetes cluster by executing this command
gcloud container clusters get-credentials $CLUSTER_NAME --region $CLUSTER_REGION
kubectl config set-context --current --namespace=$NAMESPACE

# Finally run the helm command
echo "https://console.cloud.google.com/kubernetes/workload?project=$PROJECT_ID"

helm install $RELEASE_NAME ./$APP_NAME

nodePort=$(kubectl get svc -o jsonpath='{.items[*].spec.ports[0].nodePort}')
echo "Port number allocated in cluster node for accessing service: $nodePort"

firewallRule=$(gcloud compute firewall-rules list --format=value\(name\) --filter=name=sys1-svc-rule)
echo "Firewall Rule Name: $firewallRule"

if [ "$firewallRule" = "sys1-svc-rule" ]; then
	echo "Firewall rule found! Updating rule for port $nodePort"
	read -p "Press [Enter] to execute next command."
	$(gcloud compute firewall-rules update sys1-svc-rule --allow=tcp:$nodePort)
else
	echo "Creating firewall rule for port $nodePort"
	read -p "Press [Enter] to execute next command."
	$(gcloud compute firewall-rules create sys1-svc-rule --allow=tcp:$nodePort)
fi

read -p "Press [Enter] to execute next command."
kubectl get nodes -o wide

echo "Use the EXTERNAL-IP to curl like so:"
echo "curl http://<EXTERNAL-IP>:$nodePort"

read -p "Press [Enter] key to exit..."

#if [ 1 -eq 0 ]; then
#fi
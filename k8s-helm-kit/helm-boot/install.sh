#!/usr/bin/env bash

# Configure application information
PROJECT_ID=my-kubernetes-project-268407
APP_NAME=helm-boot
RELEASE_NAME=alpha
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
echo "Note: Port $nodePort is allocated in all cluster nodes for accessing the $APP_NAME service."
read -p "Hit [Enter] to continue..."

firewallRule=$(gcloud compute firewall-rules list --format=value\(name\) --filter=name=helm-boot-svc-rule)
echo "Note: Checking firewall rule with name '$firewallRule'"
read -p "Hit [Enter] to continue..."

if [ "$firewallRule" = "helm-boot-svc-rule" ]; then
	echo "Note: Firewall rule already exists! Updating this rule to allow traffic from port $nodePort."
	read -p "Hit [Enter] to continue..."
	$(gcloud compute firewall-rules update helm-boot-svc-rule --allow=tcp:$nodePort)
else
	echo "Note: Creating a new firewall rule to allow traffic from port $nodePort."
	read -p "Hit [Enter] to continue..."
	$(gcloud compute firewall-rules create helm-boot-svc-rule --allow=tcp:$nodePort)
fi

# kubectl get nodes -o wide
externalIp=$(kubectl get node -o jsonpath='{$.items[*].status.addresses[?(@.type=="ExternalIP")].address}')
echo "Note: External IP is $externalIp"

echo "Application URL: http://$externalIp:$nodePort"
read -p "Press [Enter] key to exit."

#if [ 1 -eq 0 ]; then
#fi

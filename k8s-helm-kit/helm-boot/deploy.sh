#!/usr/bin/env bash

# Specify application information
PROJECT_ID=my-kubernetes-project-268407
APP_NAME=helm-boot
RELEASE_NAME=alpha
NAMESPACE=$APP_NAME-ns

# Specify cluster information
CLUSTER_NAME=$APP_NAME-gke
CLUSTER_REGION=asia-south1-a
CLUSTER_SIZE=1
CLUSTER_MACHINE=g1-small

# Configure GCP
gcloud config set project $PROJECT_ID
echo "https://console.cloud.google.com/kubernetes/workload?project=$PROJECT_ID"
echo "You are all set to create $CLUSTER_NAME cluster in $CLUSTER_REGION for releasing $APP_NAME."
read -p "[Hit enter to continue]"

# Create GKE
gcloud config set compute/zone $CLUSTER_REGION
gcloud container clusters create $CLUSTER_NAME --num-nodes $CLUSTER_SIZE --machine-type $CLUSTER_MACHINE --no-enable-autoupgrade

# Connect to your Kubernetes cluster by executing this command
gcloud container clusters get-credentials $CLUSTER_NAME --region $CLUSTER_REGION
kubectl create namespace $NAMESPACE
kubectl config set-context --current --namespace=$NAMESPACE

echo "A cluster is created in $CLUSTER_REGION with $CLUSTER_SIZE machine/s of '$CLUSTER_MACHINE' type. You can create up to 1008 nodes simply by configuring CLUSTER_SIZE value in deploy.sh file."
echo "You are now ready to deploy the $RELEASE_NAME release of $APP_NAME."
read -p "[Hit enter to continue]"

# Deploy the application.
helm install $RELEASE_NAME ./$APP_NAME

# Obtain the port exposed on each node for accessing the application service.
nodePort=$(kubectl get svc -o jsonpath='{.items[*].spec.ports[0].nodePort}')
echo "$RELEASE_NAME release of $APP_NAME has been installed."
echo "Port $nodePort is allocated in all cluster nodes for accessing $APP_NAME service."
echo "You are ready to read firewall rules."
read -p "[Hit enter to continue]"

# Setup firewall rules to allow traffic through node ports.
firewallRule=$(gcloud compute firewall-rules list --format=value\(name\) --filter=name=helm-boot-svc-rule)
echo "You are ready to verify '$firewallRule' for network traffic."
read -p "[Hit enter to continue]"

if [ "$firewallRule" = "helm-boot-svc-rule" ]; then
	echo "Rule found. You are ready to update this rule to allow traffic from port $nodePort."
	read -p "[Hit enter to continue]"
	$(gcloud compute firewall-rules update helm-boot-svc-rule --allow=tcp:$nodePort)
else
	echo "Rule not found! You are ready to create '$firewallRule' to allow traffic from port $nodePort."
	read -p "[Hit enter to continue]"
	$(gcloud compute firewall-rules create helm-boot-svc-rule --allow=tcp:$nodePort)
fi

# Obtain the external IP
externalIp=$(kubectl get node -o jsonpath='{$.items[*].status.addresses[?(@.type=="ExternalIP")].address}')
echo "Note: External IP is $externalIp"

# Create a test link and
echo "Application URL: http://$externalIp:$nodePort"
read -p "[Hit enter to exit]"

#if [ 1 -eq 0 ]; then
#fi

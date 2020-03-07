#!/usr/bin/env bash

# Specify application information
PROJECT_ID=my-kubernetes-project-268407
APP_NAME=lego
RELEASE_NAME=alpha
NAMESPACE=$APP_NAME-ns

# Specify cluster information
CLUSTER_NAME=$APP_NAME-gke
CLUSTER_REGION=asia-south1-a

# Configure GCP
gcloud config set project $PROJECT_ID
echo "https://console.cloud.google.com/kubernetes/workload?project=$PROJECT_ID"

# Connect to your Kubernetes cluster by executing this command
gcloud container clusters get-credentials $CLUSTER_NAME --region $CLUSTER_REGION
kubectl config set-context --current --namespace=$NAMESPACE

echo "You are all set to undeploy $APP_NAME and delete $CLUSTER_NAME cluster."

# Uninstall application
helm uninstall $RELEASE_NAME
# helm delete $RELEASE_NAME
# helm delete $(helm list --short)

echo "Application $APP_NAME has been uninstalled. You are ready to delete $CLUSTER_NAME cluster."

# Delete cluster nodes
gcloud container clusters delete $CLUSTER_NAME --region $CLUSTER_REGION

echo "The cluster $CLUSTER_NAME has been deleted."
read -p "[Hit enter to exit]"
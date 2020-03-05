#!/usr/bin/env bash

# Configure application information
PROJECT_ID=my-kubernetes-project-268407
APP_NAME=hello-world
RELEASE_NAME=pre-alpha
CLUSTER_NAME=$APP_NAME-gke
CLUSTER_REGION=asia-south1-a
NAMESPACE=$APP_NAME-ns

# Configure helm command
set helmCommand=helm install $RELEASE_NAME ./$APP_NAME

# Configure GCP
gcloud config set project $PROJECT_ID

# Connect to your Kubernetes cluster by executing this command
gcloud container clusters get-credentials $CLUSTER_NAME --region $CLUSTER_REGION
kubectl config set-context --current --namespace=$NAMESPACE

# Finally run the helm command
echo "https://console.cloud.google.com/kubernetes/workload?project=$PROJECT_ID"

helm install $RELEASE_NAME ./$APP_NAME
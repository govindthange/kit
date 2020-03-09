#!/usr/bin/env bash

PROJECT_ID=my-kubernetes-project-268407
APP_NAME=lego
RELEASE_NAME=alpha
CLUSTER_NAME=$APP_NAME-gke
CLUSTER_REGION=asia-south1-a
NAMESPACE=$APP_NAME-ns

# Configure GCP
gcloud config set project $PROJECT_ID

# Connect to your Kubernetes cluster by executing this command
gcloud container clusters get-credentials $CLUSTER_NAME --region $CLUSTER_REGION
kubectl config set-context --current --namespace=$NAMESPACE

helm uninstall $RELEASE_NAME
#helm delete $RELEASE_NAME

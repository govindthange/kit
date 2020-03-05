#!/usr/bin/env bash

# Configure application information
PROJECT_ID=my-kubernetes-project-268407
APP_NAME=hello-world
CLUSTER_NAME=$APP_NAME-gke
CLUSTER_REGION=asia-south1-a
NAMESPACE=$APP_NAME-ns

# Configure GCP
gcloud config set project $PROJECT_ID

# Create GKE
echo Create $CLUSTER_NAME

gcloud config set compute/zone $CLUSTER_REGION

#gcloud container clusters create $CLUSTER_NAME --num-nodes 1 --machine-type g1-small
gcloud container clusters create hello-world-gke1 --num-nodes 1 --machine-type g1-small

# Connect to your Kubernetes cluster by executing this command
gcloud container clusters get-credentials $CLUSTER_NAME --region $CLUSTER_REGION
kubectl create namespace $NAMESPACE
kubectl config set-context --current --namespace=$NAMESPACE
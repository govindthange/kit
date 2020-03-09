#!/usr/bin/env bash

# Specify application information
PROJECT_ID=my-kubernetes-project-268407
APP_NAME=lego
RELEASE_NAME=alpha
NAMESPACE=$APP_NAME-ns

# Configure GCP
gcloud config set project $PROJECT_ID

kubectl config set-context --current --namespace=$NAMESPACE

helm install $RELEASE_NAME ./$APP_NAME

nodePort=$(kubectl get svc -o jsonpath='{.items[*].spec.ports[0].nodePort}')
externalIp=$(kubectl get node -o jsonpath='{$.items[*].status.addresses[?(@.type=="ExternalIP")].address}')

# Create a test link and 
echo "Application URL: http://$externalIp:$nodePort"
read -p "[Hit enter to exit]"

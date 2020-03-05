echo off
set helmCommand=helm upgrade --install hello-world ./hello-world

:: Set project ID
set PROJECT_ID=my-kubernetes-project-268407

:: Configure GCP
gcloud config set project %PROJECT_ID%
gcloud container clusters get-credentials hello-world-cluster --region asia-south1-a
kubectl config set-context --current --namespace=helloworld

:: Run the helm command
echo "https://console.cloud.google.com/kubernetes/workload?project=%PROJECT_ID%"
echo %helmCommand%

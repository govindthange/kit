echo off

:: Configure application information
set PROJECT_ID=my-kubernetes-project-268407
set APP_NAME=hello-world
set RELEASE_NAME=pre-alpha
set CLUSTER_NAME=hello-world-cluster
set CLUSTER_REGION=asia-south1-a
set NAMESPACE=helloworld

:: Configure helm command
set helmCommand=helm upgrade --install %RELEASE_NAME% ./%APP_NAME%

:: Configure GCP
gcloud config set project %PROJECT_ID%

:: Connect to your Kubernetes cluster by executing this command
gcloud container clusters get-credentials %CLUSTER_NAME% --region %CLUSTER_REGION%
kubectl config set-context --current --namespace=%NAMESPACE%

:: Finally run the helm command
echo "https://console.cloud.google.com/kubernetes/workload?project=%PROJECT_ID%"
echo %helmCommand%

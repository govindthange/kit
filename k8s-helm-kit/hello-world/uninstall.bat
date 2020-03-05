::echo off

set PROJECT_ID=my-kubernetes-project-268407
set RELEASE_NAME=pre-alpha
set CLUSTER_NAME=hello-world-cluster
set CLUSTER_REGION=asia-south1-a
set NAMESPACE=hello-world-ns

:: Configure GCP
gcloud config set project %PROJECT_ID%

:: Connect to your Kubernetes cluster by executing this command
gcloud container clusters get-credentials %CLUSTER_NAME% --region %CLUSTER_REGION%
kubectl config set-context --current --namespace=%NAMESPACE%

set uninstallCommand=helm uninstall %RELEASE_NAME%
set delCommand=helm delete %RELEASE_NAME%
::set delCommand=delete $(helm list --short)

echo %uninstallCommand%
%uninstallCommand%

echo %delCommand2%
%delCommand%
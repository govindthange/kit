# Kicks

Kicks is the code name for a collection of proof of concepts, samples and starter kits for entry level projects on new platforms, technologies and frameworks.

## k8s-helm-kit

Kubernetes Helm Kit is a starter kit which focuses on various aspects of using **helm scripts** for deploying microservices styled applications on a kuberntes cluster.

**Prerequisites:**

 * Sign up for a Google account, in the unlikely case you don’t have one already.
 * Download and install Google Cloud SDK. (This includes the gcloud command-line tool, which k8s-helm-kit scripts need to create a Kubernetes cluster )
 * Install the kubectl command-line tool with gcloud components install kubectl
 * Install Helm

### hello-world app

Hello World is a sample app to test the concept of **deploying** a full blown microservice styled application on a k8s cluster **using a single script**.

 1. Create a new project in the Google Cloud Platform Console.
 2. Copy the project-code
 3. Download or clone https://github.com/govindthange/kicks
 4. Got to ./k8s-helm-kit/hello-world
 5. Replace PROJECT_ID with the proejct-code you copied above in deploy.sh and undeploy.sh files.
	```
		PROJECT_ID=my-kubernetes-project-268407
	```
 6. Run the following script to deploy.
	```sh
		$ deploy.sh
	```
      ![Output](https://github.com/govindthange/kicks/blob/master/k8s-helm-kit/hello-world/images/deploy-sh-ouput.png)
	  
	  If every thing goes well you will be shown an application URL towards the end; copy that to test your application. (http://[external-ip]:[node-port]/)
      
      You can see what you deployed using following commands:
      ```
    E:\kicks\k8s-helm-kit\hello-world>helm ls --all
    NAME            NAMESPACE       REVISION        UPDATED 				    STATUS      CHART               APP VERSION
    pre-alpha       hello-world-ns  1               2020-03-07 10:29:05.0167733 +0530 IST   deployed    hello-world-0.1.0   1.0.0
    
    E:\kicks\k8s-helm-kit\hello-world>kubectl get svc
    NAME         TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
    system-one   NodePort   10.55.244.246   <none>        80:30005/TCP   25m
    
    E:\kicks\k8s-helm-kit\hello-world>kubectl get ep
    NAME         ENDPOINTS       AGE
    system-one   10.52.0.12:80   35m
    
    E:\kicks\k8s-helm-kit\hello-world>kubectl get po
    NAME                       READY   STATUS    RESTARTS   AGE
    system-one-88cb7f7-qqjmb   1/1     Running   0          35m
    ```
 8. In the end **don't forget to delete all that you deployed**. Simply run the following script to clean everthing. Also verify the same from GCP console.
	```sh
		$ undeploy.sh
	```
	

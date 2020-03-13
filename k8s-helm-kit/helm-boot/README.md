# helm-boot system

Helm Boot is a simple application to test the idea of **deploying** a microservice styled application on a k8s cluster **through a single script**.

 1. Create a new project in the Google Cloud Platform Console.
 2. Copy the project-code for later.
 3. Do a Git clone of https://github.com/govindthange/kicks
 4. Go to ./k8s-helm-kit/helm-boot
 5. Edit deploy.sh and undeploy.sh files to set PROJECT_ID field to the proejct-code value you copied above.
	```
		PROJECT_ID=my-kubernetes-project-268407
	```
 6. Run the following script:
	```sh
		$ deploy.sh
	```
      ![Output](https://github.com/govindthange/kicks/blob/master/k8s-helm-kit/helm-boot/images/deploy-sh-ouput-alpha.png)

	  If every thing goes well you will be shown an application URL in the end; use that URL to test your application. (http://[node-ip]:[node-port]/)

      You can also verify your deployment using following commands:
      ```
	E:\kicks\k8s-helm-kit\helm-boot\images>helm ls --all
	NAME    NAMESPACE       REVISION        UPDATED                                 STATUS          CHART           APP VERSION
	alpha   helm-boot-ns    1               2020-03-13 18:18:59.5699207 +0530 IST   deployed        helm-boot-0.1.0 1.0.0

	E:\kicks\k8s-helm-kit\helm-boot\images>kubectl get svc
	NAME                  TYPE       CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
	alpha-helm-boot-svc   NodePort   10.15.251.20   <none>        80:32424/TCP   21m

	E:\kicks\k8s-helm-kit\helm-boot\images>kubectl get ep
	NAME                  ENDPOINTS       AGE
	alpha-helm-boot-svc   10.12.0.12:80   22m

	E:\kicks\k8s-helm-kit\helm-boot\images>kubectl get po
	NAME                              READY   STATUS    RESTARTS   AGE
	alpha-helm-boot-667bffbb4-dngfm   1/1     Running   0          23m
    ```
 8. In the end **don't forget to delete all that you deployed**. Simply run the following script to clean everthing. Also verify the same from GCP console.
	```sh
		$ undeploy.sh
	```

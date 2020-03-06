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

Hello World is a sample app to test deployment of microservices on a kubernetes platform using fewer scripts.

 * Create a new project in the Google Cloud Platform Console.
 * Copy the project code
 * Download or clone https://github.com/govindthange/kicks
 * Got to ./k8s-helm-kit/hello-world
 * Replace PROJECT_ID with the proejct-code you copied above in init.sh, install.sh and uninstall.sh files
	```
		PROJECT_ID=my-kubernetes-project-268407
	```
 * Run following scripts to initialze and install
	```sh
		$ init.sh
		$ install.sh
	```
 * Copy NODE-PORT displayed in the output of install.sh script.
 * Run following script to uninstall appplication
	```
		$ uninstall.sh
	```
 * If there are no errors you are good to test.
 
 **Test:**
 
 * Copy the EXTERNAL-IP address of the node from the output of the following command:
	```
		$ kubectl get nodes -o wide
	```
 * Finally open http://"EXTERNAL-IP":"NODE-PORT" in any browser.
	```
		$ curl http://<EXTERNAL-IP>:<NODE-PORT>
	```

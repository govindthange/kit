# Jenkins task that runs ansible via SSH

To create a Jenkins task that runs an ansible-playbook command inside the Ansible container, you can follow these steps:

1. Open the Jenkins user interface in your web browser by accessing http://localhost:8888 (assuming you mapped the Jenkins container's port 8080 to the host's port 8888, as defined in the Docker Compose file).

2. Create a new Jenkins pipeline job by clicking on "New Item" on the Jenkins dashboard and selecting "Pipeline" as the job type. Enter a name for the job and click "OK" to proceed.

3. In the configuration of the pipeline job, scroll down to the "Pipeline" section and select the "Pipeline script" option. You can then enter the pipeline script directly into the text area.

4. Use the following pipeline script as an example to run the ansible-playbook command inside the Ansible container:

    ```
    pipeline {
        agent any

        stages {
            stage('Run Ansible Playbook') {
                steps {
                    script {
                        // SSH into the Ansible container and run ansible-playbook command
                        sh """
                            sshpass -p "changeme"  ssh admin@ansible ansible-playbook -i /test/hosts /test/hello-world.yml
                        """
                    }
                }
            }
        }
    }
    ```

  > Make sure to replace `/test/hosts` with the appropriate path to your Ansible inventory file and playbook.yml with the path to your Ansible playbook.

5. Save the pipeline job configuration.

Now, when you trigger the Jenkins job, it will execute the ansible-playbook command inside the Ansible container, using the specified inventory file and playbook. The output and logs of the command will be displayed in the Jenkins job console output.

Ensure that the Ansible container is running (docker-compose up -d) and accessible from the Jenkins container. Adjust the script accordingly if your container names or Docker Compose setup is different from the provided Docker Compose file.
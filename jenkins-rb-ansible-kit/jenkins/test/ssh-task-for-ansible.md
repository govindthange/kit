# Jenkins task that runs ansible via SSH

## Approach 1. Hardcode credentials

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

## Approach 2. Using credential management system

To configure the password outside of the Jenkins pipeline script, you can utilize Jenkins' credential management system. Here are the detailed steps:

1. Open the Jenkins user interface in your web browser by accessing http://localhost:8888 (assuming you mapped the Jenkins container's port 8080 to the host's port 8888, as defined in the Docker Compose file).

2. Open the Jenkins dashboard in your web browser.

3. Click on `Manage Jenkins` in the left-hand sidebar.

4. Click on `Credentials` in `Security` section.

5. Click on `Global credentials` or a credentials domain appropriate for your setup.

6. Click on `Add Credentials` to create a new credential.

7. Choose the appropriate credential type based on your needs. For storing a password, you can use "Username with password" or "Secret text".

    - "Username with password": Use this type if you want to store the username and password together. Enter a unique ID, specify the username and password, and provide an optional description.

    - "Secret text": Use this type if you only want to store the password without a username. Enter a unique ID, specify the password, and provide an optional description.

8. Click `OK` to save the credential.

9. Return to jenkins dashboard screen.

10. Create a new Jenkins pipeline job by clicking on "New Item" on the Jenkins dashboard and selecting "Pipeline" as the job type. Enter a name for the job and click "OK" to proceed.

11. In the configuration of the pipeline job, scroll down to the "Pipeline" section and select the "Pipeline script" option. You can then enter the pipeline script directly into the text area.

12. Use the following pipeline script as an example to run the ansible-playbook command inside the Ansible container:

    ```
    pipeline {
        agent any

        stages {
            stage('Run Ansible Playbook') {
                steps {
                    script {
                        // SSH into the Ansible container and run ansible-playbook command
                        withCredentials([usernamePassword(credentialsId: 'ansible-admin-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh """
                                sshpass -p "${PASSWORD}" ssh "${USERNAME}@ansible" ansible-playbook -i /test/hosts /test/hello-world.yml
                            """
                        }
                    }
                }
            }
        }
    }
    ```

  > Make sure to replace `/test/hosts` with the appropriate path to your Ansible inventory file and playbook.yml with the path to your Ansible playbook.

13. Save the pipeline job configuration.

Now, when you trigger the Jenkins job, it will execute the ansible-playbook command inside the Ansible container, using the specified inventory file and playbook. The output and logs of the command will be displayed in the Jenkins job console output.

Ensure that the Ansible container is running (docker-compose up -d) and accessible from the Jenkins container. Adjust the script accordingly if your container names or Docker Compose setup is different from the provided Docker Compose file.
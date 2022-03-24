# Jenkins Multiline Pipeline (v2.339)

1. Go to jenkins dashboard.
2. Click on `New Item`.
3. Enter `Name` as "Basic Pipeline" (or name anything you like).
4. Select `Pipeline` from the list.
5. Hit `OK` button.
6. Enter `Display Name` as "Basic Pipeline".
7. Check `GitHub project`.
9. Set `Project url` as follows:
    - https://github.com/govindthange/kit.git
10. Under `Pipeline` -> `Definition` -> `Pipeline script` paste the following code:
    ```
    pipeline {
        agent any
        stages {
            stage("clean") {
                steps {
                    echo 'Cleaning the project workspace...'
                }
            }
            stage("build") {
                steps {
                    sh 'echo "Building the application..."'
                }
            }
            stage("test") {
                steps {
                    echo 'Testing...'
                }
            }
            stage("deploy") {
                steps {
                    echo 'Deploying application...'
                }
            }
        }
    }
    ```
11. Hit `Save` button.
12. Hit `Build Now` button.
13. Go to `Build History` at the bottom and select the build # menu `Console Output`.
14. Verify logs.

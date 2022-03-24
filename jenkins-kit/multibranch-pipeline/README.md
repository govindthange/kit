# Jenkins Multiline Pipeline (v2.339)

1. Go to jenkins dashboard.
2. Click on `New Item`.
3. Enter `Name` as "Basic Multibranch Pipeline" (or name anything you like).
4. Select `Multibranch Pipeline` from the list below.
5. Hit `OK` button.
6. Enter `Display Name` as "Basic Multibranch Pipeline".
7. Select `Branch Sources` as `Git`.
9. Set `Git Project Repository` to the following path:
    - https://github.com/govindthange/kit.git
10. Select `Credentials` as `-none-`.
12. Under `Behaviors` click on `Add` button.
13. Select `Filter by name (with regular expression)`.
14. Enter `^master` in `Regular expression`.
15. Under `Build Configuration` -> `Mode` -> `by Jenkinsfile` enter following path:
    - jenkins-kit/multibranch-pipeline/Jenkinsfile
16. Hit `Save` button.


# Quick Changes / Troubleshooting

1. Go to the project.
2. Go to `Build History` at the bottom and click on the build #.
3. Hit the `Replay` button on the left side menus.
4. Edit the script.
5. Hit `Run` button.

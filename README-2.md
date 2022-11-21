PS C:\dev\awsiot-react-app> git init
Initialized empty Git repository in C:/dev/awsiot-react-app/.git/

PS C:\dev\awsiot-react-app> git add .
warning: in the working copy of 'sensor-data-client/.vscode/settings.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/README.md', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/package-lock.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/package.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/public/index.html', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/public/manifest.json', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/public/robots.txt', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/src/App.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/src/App.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/src/App.test.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/src/index.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/src/index.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/src/reportWebVitals.js', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'sensor-data-client/src/setupTests.js', LF will be replaced by CRLF the next time Git touches it

PS C:\dev\awsiot-react-app> git remote add origin https://github.com/nomura0102/awsiot-react-app.git

PS C:\dev\awsiot-react-app> git branch
* main

PS C:\dev\awsiot-react-app> git status                                                              
On branch main
nothing to commit, working tree clean

PS C:\dev\awsiot-react-app> git push -u origin main
Enumerating objects: 36, done.
Counting objects: 100% (36/36), done.
Delta compression using up to 8 threads
Compressing objects: 100% (33/33), done.
Writing objects: 100% (36/36), 176.70 KiB | 2.13 MiB/s, done.
Total 36 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), done.
To https://github.com/nomura0102/awsiot-react-app.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.

PS C:\dev\awsiot-react-app> git checkout -b devops01
Switched to a new branch 'devops01'

PS C:\dev\awsiot-react-app> git add .

PS C:\dev\awsiot-react-app> git push -u origin devops01
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote: 
remote: Create a pull request for 'devops01' on GitHub by visiting:
remote:      https://github.com/nomura0102/awsiot-react-app/pull/new/devops01
remote:
To https://github.com/nomura0102/awsiot-react-app.git
 * [new branch]      devops01 -> devops01
branch 'devops01' set up to track 'origin/devops01'.

PS C:\dev\awsiot-react-app> git commit -m "20221120 追加”
[devops01 d123b9f] 20221120 追加
 1 file changed, 52 insertions(+), 6 deletions(-)

PS C:\dev\awsiot-react-app> git push -u origin devops01
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 8 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 1.04 KiB | 266.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/nomura0102/awsiot-react-app.git
   5268037..d123b9f  devops01 -> devops01
branch 'devops01' set up to track 'origin/devops01'.

PS C:\dev\awsiot-react-app>git log
commit c9aed537a69261432e93f946b7ee7b1f6480a075 (HEAD -> devops01)
Author: nomura0102 <nomura0102@gmail.com>
Date:   Sun Nov 20 22:05:58 2022 +0900

    20221120 追加2

commit d123b9f51fc9e914339f05b97590bab87171001c (origin/devops01)
Author: nomura0102 <nomura0102@gmail.com>

PS C:\dev\awsiot-react-app>
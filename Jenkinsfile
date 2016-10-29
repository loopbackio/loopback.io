#!groovy

def gitEnv = [
  'GIT_COMMITTER_NAME=StrongLoop Bot',
  'GIT_COMMITTER_EMAIL=slnode@ca.ibm.com',
  'GIT_AUTHOR_NAME=StrongLoop Bot',
  'GIT_AUTHOR_EMAIL=slnode@ca.ibm.com',
]

node('linux && git') {
  stage('checkout') {
    checkout scm
  }
  stage('download updates') {
    sh './update-readmes.sh'
  }
  stage('check updates') {
     sh 'git status'
  }
  stage('commit updates') {
    if (sh(returnStatus: true, script: 'git diff --quiet') != 0) {
      echo "Updates found, committing and pushing back up to github..."
      // this will add new files if the readme list grows, but removing
      // existing files will have to be done by a human for now.
      sh 'git add pages/en/lb2/readmes'
      withEnv(gitEnv) {
        sh 'git commit -m "Update readmes from loopback repos"'
      }
      sshagent(credentials: ['loopback-io-deploy']) {
        sh 'git push origin HEAD:$BRANCH_NAME'
      }
    } else {
      echo "No updates to commit"
    }
  }
}

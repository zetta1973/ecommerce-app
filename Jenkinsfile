pipeline {
  agent any
  stages {
    stage('Instalar dependencias') {
      steps {
        sh 'npm install'
      }
    }
    stage('Build Angular') {
      steps {
        sh 'npm run build --configuration production'
      }
    }
    stage('Docker Build') {
      steps {
        sh 'docker build -t ecommerce-app .'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker run -d -p 4200:80 ecommerce-app'
      }
    }
  }
}

pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                bat '"C:\\Users\\t\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" compose build'
            }
        }

        stage('Deploy Services') {
            steps {
                bat '"C:\\Users\\t\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" compose up -d'
            }
        }

        stage('Check Services') {
            steps {
                bat '"C:\\Users\\t\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" compose ps'
            }
        }
    }
}
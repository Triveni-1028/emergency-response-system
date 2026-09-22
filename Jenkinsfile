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
                bat 'docker compose build'
            }
        }

        stage('Deploy Services') {
            steps {
                bat 'docker compose up -d'
            }
        }

        stage('Check Services') {
            steps {
                bat 'docker compose ps'
            }
        }
    }
}
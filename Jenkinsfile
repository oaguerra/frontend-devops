pipeline {
    agent any
    stages {
        stage("Build - Instalación de dependencias") {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            stages {
                stage("Instalación de dependencias") {
                    steps {
                        sh 'npm install'
                    }
                }
                stage("Build del proyecto") {
                    steps {
                        sh 'npm run build'
                    }
                }
            }
        }
    }
}

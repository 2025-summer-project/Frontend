pipeline {
    agent {
        docker {
            image 'node:18'  // Node.js 포함된 이미지 사용
        }
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/2025-summer-project/Frontend.git'
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }

    post {
        success {
            echo '✅ React build 완료!'
        }
        failure {
            echo '❌ 빌드 실패 😢'
        }
    }
}

pipeline {
    agent {
        docker {
            image 'node:18'
            args '-u root'
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
            sh """
            curl -H "Content-Type: application/json" \\
                 -X POST \\
                 -d '{
                     "username": "Jenkins CI",
                     "avatar_url": "https://www.jenkins.io/images/logos/jenkins/jenkins.png",
                     "embeds": [{
                         "title": "✅ Frontend 빌드 성공!",
                         "description": "**Job:** #${env.BUILD_NUMBER}\\n🔗 [Jenkins에서 보기](${env.BUILD_URL})",
                         "color": 65280
                     }]
                 }' \
                 https://discord.com/api/webhooks/1392458187940298803/y3iurVacjDbVYc8LUZNCTjU0oSDVKTGagQwT5em2iGoj1sJ7vvuKL5I469zeZbfhLHqS
            """
        }
    }
}

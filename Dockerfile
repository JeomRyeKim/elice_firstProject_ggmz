# Node.js 14 버전 이미지를 베이스 이미지로 사용합니다.
FROM node:14

# 디렉토리를 작업 디렉토리로 설정합니다.
WORKDIR /app

# 현재 디렉토리에 있는 package.json 및 package-lock.json 파일을 /app 디렉토리로 복사합니다.
COPY package*.json ./

#  앱이 필요로 하는 종속성을 설치합니다.
RUN npm install

# 현재 디렉토리에 있는 모든 파일을 /app 디렉토리로 복사합니다.
COPY . .

# 앱이 사용하는 포트 번호를 지정합니다.
EXPOSE 3000

# 앱을 실행하는 명령어를 정의합니다. npm start 명령을 실행합니다.
CMD ["npm", "start"]
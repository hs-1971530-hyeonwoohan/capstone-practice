# Passionroad (열정도)

**팀원 : 김재구, 김태영, 한우창, 한현우**

**프론트 : 한우창, 김재구**

**백엔드 : 한현우, 김태영**


## 소개

 **화상채팅을 활용한 비대면 스터디, 팀프로젝트 플랫폼**
 
 코로나로 인한 팬데믹 이후 많은 활동이 비대면에서 이루어지고 있습니다. 강의, 스터디, 팀프로젝트도 예외는 아니었습니다. 줌, WebEx등의 화상채팅 프로그램을 활용하는 사례가 늘었고 이에 대한 사람들의 선호도도 높아졌습니다. 하지만, 함께할 사람들을 모으고 쉽게 정보를 공유할 공간이 마련되어 있지는 않았습니다. 
 우리는 기존의 화상채팅 프로그램을 개선하여 정보를 공유하고 사람을 모을 수 있는 게시판과 자신의 일정을 기록할 수 있는 캘린더를 추가한 웹 서비스를 구현하기로 하였습니다. 
 
## 목표

 1. 비대면 환경에서 다른 사람과의 원격 화상채팅 제공
 2. 사람들과 소통할 수 있는 게시판 제공
 3. 자신의 공부시간, 작성한 게시글, 참여하고있는 스터디 등을 확인할 수 있는 대시보드 제공
 4. 자신의 일정을 기록할 수 있는 캘린더 제공

## 시연 화면

| 홈페이지 | 화상채팅 |
|---------|---------|
| <img width="1440" alt="홈페이지" src="https://github.com/hyeonwoo-han/2023-hansung-capstone/assets/53888037/3cb7e1c3-12d7-477b-97f5-3e62153b802f"> | <img width="1440" alt="화상채팅화면" src="https://github.com/hyeonwoo-han/2023-hansung-capstone/assets/53888037/9d31fe4c-db08-4ce5-ab61-407542fe9b5f">

| 대시보드 | 캘린더 |
|---------|-------|
|<img width="1440" alt="대시보드" src="https://github.com/hyeonwoo-han/2023-hansung-capstone/assets/53888037/e9272044-0f5b-474a-b84a-835d415ee196">|<img width="1440" alt="캘린더" src="https://github.com/hyeonwoo-han/2023-hansung-capstone/assets/53888037/5123073b-ae28-43eb-bfa5-197878c6d8ca">|

| 게시판 | 게시글조회 |
|-------|-----------|
|<img width="1440" alt="게시판" src="https://github.com/hyeonwoo-han/2023-hansung-capstone/assets/53888037/26addd5f-ae2f-42af-b5d1-afb2b04e15dd">|<img width="1440" alt="게시글조회" src="https://github.com/hyeonwoo-han/2023-hansung-capstone/assets/53888037/2d13e4c2-2720-4c04-ac9c-c6b4d23b9635">|

## 프로젝트 구조 

![프로젝트구조](https://github.com/hyeonwoo-han/2023-hansung-capstone/assets/53888037/22b312d4-16ab-4d89-a5e2-bf160f580a6c)

## 사용언어 및 기술
* Language : Java / Javascript / SQL
* OS : Windows / Mac / Linux Ubuntu (AWS EC2)
* Framework & Library : React / Tailwind / Recoil / Spring Boot / QueryDSL / OpenVidu
* Tool : intelliJ / VSCode / Docker / MariaDB




## 배포 
* **도메인 구입, HTTPS SSL 인증서발급**
* **OpenVidu 도커 컨테이너 실행**
* **Nginx ( React )**
	* Nginx 설치
	* 설치 경로로 이동
		* `cd /etc/nginx/sites-available`
	* default 설정 삭제
	* 새로운 sites-available 설정파일 작성
	```
	server {

        location / {
                root [리액트앱 빌드파일 경로];      
                index index.html index.htm;
                try_files $uri $uri/ /index.html; # 파일이 존재하지 않을 시 index.html로 redirect
        }

        location /api {
                proxy_pass https://[스프링 API 서버 ip]:[포트번호];
        }

	    listen 443 ssl; # managed by Certbot
	    ssl_certificate /etc/letsencrypt/live/[도메인주소]/fullchain.pem; # managed by Certbot
	    ssl_certificate_key /etc/letsencrypt/live/[도메인주소]/privkey.pem; # managed by Certbot
	#    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
	#   ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
	}

	server {
	    if ($host = [도메인주소]) {
	        return 301 https://$host$request_uri;
	    } # managed by Certbot

	        listen 80;
	        server_name [도메인주소];
	    return 404; # managed by Certbot
	}
	```
	* sites-enabled 에 심볼릭 링크 생성
		* `sudo ln -s /etc/nginx/sites-available/[설정파일이름] /etc/nginx/sites-enabled`
	* nginx 시작
		* `sudo systemctl start nginx.service`


* **Tomcat ( Spring API 서버 )**
	* Spring Boot 의 내장 Tomcat 사용
	* 프로젝트 루트 위치로 이동
	* 테스트 없이 빌드 :
		* `./gradlew clean build -x test`
	* 빌드 파일 위치로 이동
		* `cd build/libs`
	* 빌드 배포
		* `nohup java -jar [file name].jar &`
	* 로그 확인
		* `cat nohup.out`

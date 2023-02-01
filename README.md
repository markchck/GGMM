# 그게몸말? ( 몸으로 말해요 화상 웹 게임 )

## 👇그게몸말 소개 및 시연 영상👇
<img width="500" alt="메인화면" src="https://user-images.githubusercontent.com/26597015/216051373-37b50720-f024-4d21-ac66-4fcf405ac6e2.png">

## 게임 소개
코로나가 장기화 되면서, 집콕의 방식도 변화하고 있습니다. 친구들과 랜선 술먹방을 해보신 경험이 있으실까요? 이야기만 하기 지루하지 않으신가요? 그냥 몸으로 말해요와 뭐가 다르냐구요? 카드뒤집기 미니게임으로 스페셜 아이템을 획득하고, 아이템을 활용하여 상대방을 방해해보세요! 


## 프로젝트 기간 
- 2022.12.22 ~ 2023.01.31 (5주)

## 그게몸말 게임 화면

### 카드뒤집기 미니게임
카드뒤집기 게임을 통해서 더 많은 보물을 찾아낸 팀에게 강력한 셔터 아이템이 주어집니다.
![카드뒤집기](https://user-images.githubusercontent.com/26597015/216054228-9f686256-4e42-4798-9421-b58c11c6f7aa.gif)


### 셔터 아이템
![셔터](https://user-images.githubusercontent.com/26597015/216054875-b039de1c-ec07-4c19-9c90-11564743eaf9.gif)


### 4분할 아이템
![4분할](https://user-images.githubusercontent.com/26597015/216054936-cc90e9df-6bb7-4582-ad51-b4726a2bf514.gif)


### 미러 아이템
![미러](https://user-images.githubusercontent.com/26597015/216055362-f318d785-bffe-4f46-8fa4-3f0ed0d27fc3.gif)



### 블러 아이템



### 마이페이지 - 뱃지 리워드, 운동 일일 기록, 운동일 수


### 마이페이지 - 프로필 변경


### 랭킹


### 튜토리얼


### 회원가입 - 이메일 인증



## ✨ 주요 기능
---
- 서비스 설명 : 모두가 건강하게 집에서 즐길 수 있는 운동 게임
- 주요 기능 :
    - webRTC를 통한 실시간 화상 운동 게임
    - Pose Detection을 통한 자동 자세 인식
    - 게임 log를 통한 사용자 운동기록 추적
    - 기록에 따른 보상을 통한 운동 동기 부여

### 🖥️ 개발 환경

---

🖱**Backend**
- IntelliJ
- spring boot 2.4.5
- spring-boot-jpa
- Spring Security
- Java 8
- AWS EC2
- mysql
- redis

🖱**Frontend**

- Visual Studio Code
- React.js 17.0.2
- styled-components 5.3.0
- Material-UI
- redux-toolkit 1.6.1
- redux 4.1.0

🖱**Web RTC**

- openvidu 2.19.0

🖱**Pose Detection**

- Teachable Machine

🖱**CI/CD**
- aws ec2
- docker
- nginx
- jenkins

### 💫 서비스 아키텍처

---



### ✨Jenkins를 이용한 CD 구축 및 SSL 인증서 적용

---

제가 담당하여 서비스 아키텍처와 같이, Jenkins의 pipeline을 이용하여 자동 배포를 구축하였습니다. Gitlab webhook을 설정하여 Jenkins에 빌드 트리거를 설정했고, 이에 따라 Gitlab에서 master 브랜치에 push하면 자동으로 배포될 수 있도록 구축하여 개발하는 과정에서 배포로 인한 시간 낭비를 줄였습니다.
또한 프론트엔드인 React.js는 Nginx와 함께 docker image로 빌드하여 배포하였고, 백엔드 및 redis, openvidu 또한 docker container로 배포하였습니다. 그리고 Nginx와 letsencrypt를 이용하여 ssl 인증서를 적용하였고, 프론트엔드는 443(https)로 프록시로 분기시켰고 백엔드는 /api 경로로 프록시를 걸어줬습니다.

- 프로그램 배포 방법은 [여기]

### ✨기술 특이점

---

- Teachable Machine

자세를 학습시켜 pose detection을 통한 모션 인식으로 자세 인식을 통해 유저가 각 운동 종목을 잘 수행하는지 체크했고, 운동 개수를 카운팅할 수 있도록 하였습니다. 

![티처블머신](https://user-images.githubusercontent.com/31542907/131527504-6a51078f-bc58-4ae7-8b5b-c36c6f81f600.png)

이런 식으로 Teachable Machine으로 학습을 시키면 자세별로 도출된 값을 이용할 수 있게 됩니다. 여기서 추출된 코드와 값으로 홈동 서비스에 맞게 가공하여 구현하였습니다.

- WebRTC (Openvidu)

Openvidu로만 할 수 있는 기능 뿐만이 아니라 백엔드를 함께 이용한 개발로 여러 기능을 구현했습니다. 각 방마다 인원수가 6명까지만 들어갈 수 있게 구현하였고, 방장만 게임을 시작할 수 있기에 방을 만들거나 방에서 인원이 나가면 자동으로 다른 사람에게 방장 권한이 부여되게 하였습니다. 그리고 private 방을 만들 수 있게 하여 방 번호와 비밀번호를 아는 사용자 외에는 들어오지 못하게 구현하였고, 빠른 시작 기능을 구현하여 현재 존재하는 방에 빠르게 입장할 수 있게 하였고, 방이 없으면 자동으로 방 생성까지 할 수 있도록 구현하였습니다.

- Redis

랭킹 기능에 들어가는 랭킹 정보는 자정마다 업데이트 되는 정보여서 단순한 구조의 정보이고, 반복적으로 동일하게 제공되고, 최신화가 실시간으로 필요하지 않은 정보였습니다. 이러한  데이터의 특성으로 캐싱을 적용하기에 적절하다고 생각을 했고, Redis에 랭킹 정보를 저장하여 DB를 거치지 않고 정보를 가져와 트래픽이 많아질 때 백엔드 부하를 줄이고, 정보 조회 속도를 높였습니다. 또한 저희는 Spring Scurity와 JWT를 이용하여 인증을 구현하였는데, Redis를 이용해 로그아웃시킨 토큰들을 만료처리하여 해당 토큰으로는 다시 인증할 수 없도록 구현하였습니다.

- redux-toolkit

프론트엔드 구현시에는 React와 redux-toolkit을 이용하여 Ducks Pattern 기반 상태 관리를 하였습니다.

- 배포

도커, Nginx, Jenkins를 이용한 자동 무중단 배포를 구현하였습니다. 백엔드를 도커 컨테이너로 배포하였고, 프론트로 Nginx와 함께 도커 컨테이너로 배포하였습니다.



### 👨‍👩‍👧 협업 툴

---

- Git
- Jira
- Notion
- Mattermost
- Webex

### ✨Git 컨벤션

---

```
FEAT:    새로운 기능을 추가할 경우
FIX:     버그를 고친 경우
STYLE:   코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우
REFATOR: 프로덕션 코드 리팩토링
DOCS:    문서를 수정한 경우(ex> Swagger)
Rename:  파일 혹은 폴더명 수정 및 이동
Remove:  파일 삭제
CHORE:    빌드 업무 수정(ex> dependency 추가)
```

```bash
커밋 타입: 내용 자세히 적어주기 [#지라이슈넘버]
ex) FEAT: 로그인 rest api 추가 [#지라이슈넘버]
```

해당 [Git 스타일 가이드](https://udacity.github.io/git-styleguide/)를 참고하여서 정했습니다


### ✨ EC2 포트 정리
---
|**PORT**|**이름**|
|:---:|:---:|
|443|HTTPS|
|80|HTTP - HTTPS로 리다이렉트(프론트 페이지지로 리다이렉트)|
|8443|Openvidu|
|8379|Redis|
|3306|MySQL|
|8081|Jenkins|
|8080|Spring boot Docker Container|
|3000|React, NginX Docker Container|

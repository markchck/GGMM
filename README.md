# 그게몸말? ( 몸으로 말해요 화상 웹 게임 )

## 👇그게몸말 소개 및 시연 영상👇
<img width="500" alt="메인화면" src="https://user-images.githubusercontent.com/26597015/216051373-37b50720-f024-4d21-ac66-4fcf405ac6e2.png">

https://www.youtube.com/watch?v=SDogkTxsKTo

## 게임 소개
코로나가 장기화 되면서, 집콕의 방식도 변화하고 있습니다. 친구들과 랜선 술먹방을 해보신 경험이 있으실까요? 이야기만 하기 지루하지 않으신가요? 그냥 몸으로 말해요와 뭐가 다르냐구요? 카드뒤집기 미니게임으로 스페셜 아이템을 획득하고, 아이템을 활용하여 상대방을 방해해보세요! 


## 프로젝트 기간 
- 2022.12.22 ~ 2023.01.31 (5주)


## 그게몸말 게임 화면

### 카드뒤집기 미니게임
카드뒤집기 게임을 통해서 더 많은 보물을 찾아낸 팀에게 강력한 셔터 아이템이 주어집니다.
<img width="500" alt="셔터" src="https://user-images.githubusercontent.com/26597015/216054228-9f686256-4e42-4798-9421-b58c11c6f7aa.gif">

### 셔터 아이템
<img width="500" alt="셔터" src="https://user-images.githubusercontent.com/26597015/216054875-b039de1c-ec07-4c19-9c90-11564743eaf9.gif">

### 4분할 아이템
<img width="500" alt="4분할" src="https://user-images.githubusercontent.com/26597015/216054936-cc90e9df-6bb7-4582-ad51-b4726a2bf514.gif">

### 미러 아이템
<img width="500" alt="미러" src="https://user-images.githubusercontent.com/26597015/216055362-f318d785-bffe-4f46-8fa4-3f0ed0d27fc3.gif">


### 여러 아이템 조합

<img width="300" alt="데칼코마니,4분할" src="https://user-images.githubusercontent.com/26597015/216056872-d1a7185a-b98f-4e52-9f9c-e07e9fc35d54.png">

<img width="300" alt="데칼코마니,모자이크" src="https://user-images.githubusercontent.com/26597015/216057503-39d6f78b-bb7b-4abc-b009-d1548d42374d.png">


## ✨ 주요 기능
---
- 주요 기능 :
    - 실시간 통신: webRTC 기술을 사용하여 여러 사람들이 이용하는데 강점이 있는 SFU 방식의 OpenVidu로 실시간 통신을 구현
    - 다양하 게임 아이템: 셔터, 4분할, 데칼코마니 등 다양한 영상 기능을 통해 상대팀의 점수 획득을 저지하여 기존 게임과는 다른 재미를 추구
    - 카드 뒤집기 게임: 멀티 커서를 구현하여 6명이 아이템을 얻기 위한 실시간 카드 뒤집기 게임을 플레이

### 🖥️ 개발 환경

---
- AWS EC2 (t2.medium)
- Ubuntu (20.04 LTS)
- OpenVidu (2.25.0)
- React (17.0.1)
- Zustand (4.3.1)
- Node express (4.18.1)
- MongoDB (4.2.21)

## Deploy하는 방법
https://www.notion.so/markchck/Deploy-04435d23b4474b5796acbe33fb136b94


### 💫 서비스 아키텍처

---
<img width="500" alt="아키텍처" src="https://user-images.githubusercontent.com/26597015/216062631-66baaa1c-98b6-4758-9967-ab571f692d16.png">


### ✨기술적 챌린지
---
#### 타이머가 클라이언트 별로 다르게 돌아가는 문제 
<img width="500" alt="타이머오류" src="https://user-images.githubusercontent.com/26597015/216063170-3dc42d5e-7676-4d22-bb76-7eb9434833a9.png">

#### 카드를 하나만 뒤집었는데 복수로 점수가 증가하는 문제
<img width="500" alt="레이스컨디션" src="https://user-images.githubusercontent.com/26597015/216063203-15f5f8d0-8b02-4cd1-8a3e-4b215e5e8849.png">

#### CPU 사용률이 최대 45%까지 증가하는 문제
<img width="500" alt="서버과부화" src="https://user-images.githubusercontent.com/26597015/216063218-1bb744f6-a282-4363-a8c9-a0c71c791476.png">

#### 그외 기술적 챌린지
https://www.notion.so/markchck/4e2ac5889a1c48b2ba5f7bdb98977df3


### ✨Git 컨벤션
---
git commit -m"컨벤션 네이밍 컨벤션 
feat : 새로운 기능에 대한 커밋 
fix : 버그 수정에 대한 커밋 
build : 빌드 관련 파일 수정에 대한 커밋
chore : 그 외 자잘한 수정에 대한 커밋 
ci : CI관련 설정 수정에 대한 커밋
docs : 문서 수정에 대한 커밋 
style : 코드 스타일 혹은 포맷 등에 관한 커밋 
refactor : 코드 리팩토링에 대한 커밋 
test : 테스트 코드 수정에 대한 커밋


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

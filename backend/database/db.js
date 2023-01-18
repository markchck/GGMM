
// /* ---------------- 몽고디비 사용 -------------------- 

const mongoose = require("mongoose")
const QuestWord = require("../models/theme");

mongoose.connect("mongodb://127.0.0.1:27017/namanmu",{
	useNewUrlParser:true, 
	useUnifiedTopology:true, 
	} //두번째 인자 부분은 아래에서 설명
);

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error) 
db.once("open", handleOpen); //open 이벤트가 발생 시 handleOpen 실행 
db.on("error", handleError); //error 이벤트가 발생할 때마다 handleError 실행 );

/*----- db넣기 -----*/


// create an array of documents to insert
const QuestWords = [
  { name: '기린'},
  { name: '호랑이' },
  { name: '낙타' },
  { name: '하마'},
  { name: '코알라' },
  { name: '곰'},
  { name: '늑대' },
  { name: '토끼'},
  { name: '판다' },
  { name: '얼룩말'},
  { name: '다람쥐' },
  { name: '거위'},
  { name: '수달' },
  { name: '펭귄'},
  { name: '사막여우' },
  { name: '하이애나'},
  { name: '스컹크' },
  { name: '개'},
  { name: '고양이'},
  { name: '사자'},
  { name: '공원'},
  { name: '사과'},
  { name: '책'},
  { name: '컴퓨터'},
  { name: '자동차'},
  { name: '핸드폰'},
  { name: '비행기'},
  { name: '나무'},
  { name: '하늘'},
  { name: '바다'},
  { name: '산'},
  { name: '강'},
  { name: '도시'},
  { name: '키보드'},
  { name: '오징어'},
  { name: '학교'},
  { name: '방탄소년단'},
  { name: '병원'},
  { name: '공장'},
  { name: '식당'},
  { name: '카페'},
  { name: '백화점'},
  { name: '서점'},
  { name: '도서관'},
  { name: '박물관'},
  { name: '도둑'},
  { name: '영화관'},
  { name: '콘서트홀'},
  { name: '트와이스'},
  { name: '제주도'},
  { name: '공원'},
  { name: '수영'},
  { name: '테니스'},
  { name: '헬스'},
  { name: '배틀그라운드'},
  { name: '술'},
  { name: '노래'},
  { name: '크롬'},
  { name: '젓가락'},
  { name: '박물관'},
  { name: '미술관'},
  { name: '체육관'},
  { name: '야구'},
  { name: '축구'},
  { name: '농구'},
  { name: '핸드볼'},
  { name: '배구'},
  { name: '탁구'},
  { name: '스케이트'},
  { name: '볼링'},
  { name: '골프'},
  { name: '승마'},
  { name: '컴퓨터'},
  { name: '등산'},
  { name: '자전거'},
  { name: '낚시'},
  { name: '사이다'},
  { name: '캠핑장'},
  { name: '윷놀이'},
  { name: '스키장'},
  { name: '미국'},
  { name: '카지노'},
  { name: '뮤지컬'},
  { name: '코카콜라'},
  { name: '호텔'},
  { name: '리조트'},
  { name: '아파트'},
  { name: '자동차'},
  { name: '주택'},
  { name: '브라질'},
  { name: '우산'},
  { name: '캠핑장'},
  { name: '영국'},
  { name: '에펠탑'},
  { name: '수영장'},
  { name: '사우나'},
  { name: '온천'},
  { name: '스파'},
  { name: '마사지'},
  { name: '요가'},
  { name: '슬리퍼'},
  { name: '샤워'},
  { name: '미용실'}
];

// insert the documents
QuestWord.insertMany(QuestWords, function(error, docs) {
  if (error) {
    console.log(error);
  } else {
    console.log("성공했다!! DB확인해보자!");
  }
});

// /* ---------------- 몽고디비 사용 -------------------- 

const mongoose = require("mongoose")
const Animal = require("../models/theme");

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
const Animals = [
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
  { name: '버팔로' },
  { name: '거위'},
  { name: '수달' },
  { name: '펭귄'},
  { name: '사막여우' },
  { name: '하이애나'},
  { name: '스컹크' },
];

// insert the documents
Animal.insertMany(Animals, function(error, docs) {
  if (error) {
    console.log(error);
  } else {
    console.log(docs + "성공했다!! DB확인해보자!");
  }
});

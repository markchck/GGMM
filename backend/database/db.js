
// /* ---------------- 몽고디비 사용 -------------------- 

const mongoose = require("mongoose")
const AnimalWord = require("../models/animals");
const PersonWord = require("../models/Person");
const EquipmentWord = require("../models/equipment");
const MovieWord = require("../models/movies");
const ExerciseWord = require("../models/exercise");
const JobWord = require("../models/job");



mongoose.connect("mongodb://127.0.0.1:27017/namanmu", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
);

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error)
db.once("open", handleOpen); //open 이벤트가 발생 시 handleOpen 실행 
db.on("error", handleError); //error 이벤트가 발생할 때마다 handleError 실행 );


const AnimalWords = [
  {
    theme: '동물',
    name: '기린'
  },
  {
    theme: '동물',
    name: '낙타'
  },
  {
    theme: '동물',
    name: '코알라'
  },
  {
    theme: '동물',
    name: '늑대'
  },
  {
    theme: '동물',
    name: '토끼'
  },
  {
    theme: '동물',
    name: '오리'
  },
  {
    theme: '동물',
    name: '수달'
  },
  {
    theme: '동물',
    name: '펭귄'
  },
  {
    theme: '동물',
    name: '고양이'
  },
  {
    theme: '동물',
    name: '코끼리'
  },
  {
    theme: '동물',
    name: '나무늘보'
  },
  {
    theme: '동물',
    name: '코뿔소'
  },
  {
    theme: '동물',
    name: '타조'
  },
  {
    theme: '동물',
    name: '돼지'
  },
  {
    theme: '동물',
    name: '캥거루'
  },
  {
    theme: '동물',
    name: '소'
  },
  {
    theme: '동물',
    name: '미어캣'
  },
  {
    theme: '동물',
    name: '뱀'
  },
  {
    theme: '동물',
    name: '하마'
  },
  {
    theme: '동물',
    name: '비둘기'
  },
  {
    theme: '동물',
    name: '고릴라'
  },
  {
    theme: '동물',
    name: '쥐'
  },
];

//  insert the AnimalWord documents
AnimalWord.insertMany(AnimalWords, function (error, docs) {
  if (error) {
    console.log(error);
  } else {
    console.log("성공했다!! 동물 DB 성공! 확인해보자!");
  }
});

const ExerciseWords = [
  {
    theme: '취미',
    name: '노래'
  },
  {
    theme: '취미',
    name: '춤'
  },
  {
    theme: '취미',
    name: '팬싱'
  },
  {
    theme: '취미',
    name: '농구'
  },
  {
    theme: '취미',
    name: '야구'
  },
  {
    theme: '취미',
    name: '축구'
  },
  {
    theme: '취미',
    name: '배구'
  },
  {
    theme: '취미',
    name: '탁구'
  },
  {
    theme: '취미',
    name: '클라이밍'
  },
  {
    theme: '취미',
    name: '볼링'
  },
  {
    theme: '취미',
    name: '골프'
  },
  {
    theme: '취미',
    name: '승마'
  },
  {
    theme: '취미',
    name: '등산'
  },
  {
    theme: '취미',
    name: '자전거'
  },
  {
    theme: '취미',
    name: '낚시'
  },
  {
    theme: '취미',
    name: '스케이트'
  },
  {
    theme: '취미',
    name: '스키'
  },
  {
    theme: '취미',
    name: '수영'
  },
  {
    theme: '취미',
    name: '헬스'
  },
  {
    theme: '취미',
    name: '요가'
  },
  {
    theme: '취미',
    name: '태권도'
  },
  {
    theme: '취미',
    name: '컬링'
  },
  {
    theme: '취미',
    name: '테니스'
  },
  {
    theme: '취미',
    name: '발레'
  },
  {
    theme: '취미',
    name: '사격'
  },
  {
    theme: '취미',
    name: '양궁'
  },
  {
    theme: '취미',
    name: '족구'
  },
  {
    theme: '취미',
    name: '배드민턴'
  },
  {
    theme: '취미',
    name: '씨름'
  },
  {
    theme: '취미',
    name: '복싱'
  },
  {
    theme: '취미',
    name: '장대높이뛰기'
  },
  {
    theme: '취미',
    name: '역도'
  },
  {
    theme: '취미',
    name: '게임'
  },
];

ExerciseWord.insertMany(ExerciseWords, function (error, docs) {
  if (error) {
    console.log(error);
  } else {
    console.log("성공했다!! 취미 DB 성공! 확인해보자!");
  }
});

const MovieWords = [
  {
    theme: '영화',
    name: '캡틴아메리카'
  },
  {
    theme: '영화',
    name: '아이언맨'
  },
  {
    theme: '영화',
    name: '토르'
  },
  {
    theme: '영화',
    name: '헐크'
  },
  {
    theme: '영화',
    name: '블랙위도우'
  },
  {
    theme: '영화',
    name: '스파이더맨'
  },
  {
    theme: '영화',
    name: '닥터스트레인지'
  },
  {
    theme: '영화',
    name: '헌터킬러'
  },
  {
    theme: '영화',
    name: '스타워즈'
  },
  {
    theme: '영화',
    name: '어벤져스'
  },
  {
    theme: '영화',
    name: '분노의질주'
  },
  {
    theme: '영화',
    name: '겨울왕국'
  },
  {
    theme: '영화',
    name: '데스노트'
  },
  {
    theme: '영화',
    name: '라이온킹'
  },
  {
    theme: '영화',
    name: '킹콩'
  },
  {
    theme: '영화',
    name: '킹스맨'
  },
  {
    theme: '영화',
    name: '킹덤'
  },
  {
    theme: '영화',
    name: '타이타닉'
  },
  {
    theme: '영화',
    name: '인어공주'
  },
  {
    theme: '영화',
    name: '트랜스포머'
  },
  {
    theme: '영화',
    name: '해리포터'
  },
  {
    theme: '영화',
    name: '로보캅'
  },
  {
    theme: '영화',
    name: '토이스토리'
  },
  {
    theme: '영화',
    name: '반지의제왕'
  },
  {
    theme: '영화',
    name: '매트릭스'
  },
  {
    theme: '영화',
    name: '태극기휘날리며'
  },
  {
    theme: '영화',
    name: '라푼젤'
  },
  {
    theme: '영화',
    name: '타잔'
  },
  {
    theme: '영화',
    name: '맨인블랙'
  },
  {
    theme: '영화',
    name: '이티'
  },
  {
    theme: '영화',
    name: '괴물'
  },
  {
    theme: '영화',
    name: '인터스텔라'
  },


];

MovieWord.insertMany(MovieWords, function (error, docs) {
  if (error) {
    console.log(error);
  } else {
    console.log("성공했다!! 영화 DB 성공! 확인해보자!");
  }
});

const PersonWords = [
  {
    theme: '인물',
    name: '아이유'
  },
  {
    theme: '인물',
    name: '박보검'
  },
  {
    theme: '인물',
    name: '짐캐리'
  },
  {
    theme: '인물',
    name: '송강호'
  },
  {
    theme: '인물',
    name: '호날두'
  },
  {
    theme: '인물',
    name: '이병헌'
  },
  {
    theme: '인물',
    name: '메시'
  },
  {
    theme: '인물',
    name: '강호동'
  },
  {
    theme: '인물',
    name: '마이클잭슨'
  },
  {
    theme: '인물',
    name: '마이클조던'
  },
  {
    theme: '인물',
    name: '박지성'
  },
  {
    theme: '인물',
    name: '싸이'
  },
  {
    theme: '인물',
    name: '원더걸스'
  },
  {
    theme: '인물',
    name: '노홍철'
  },
  {
    theme: '인물',
    name: '타노스'
  },
  {
    theme: '인물',
    name: '이승철'
  },
  {
    theme: '인물',
    name: '저스틴비버'
  },
  {
    theme: '인물',
    name: '이승우'
  },
  {
    theme: '인물',
    name: '최홍만'
  },
  {
    theme: '인물',
    name: '이승엽'
  },
  {
    theme: '인물',
    name: '박찬호'
  },
  {
    theme: '인물',
    name: '강호동'
  },
  {
    theme: '인물',
    name: '트럼프'
  },
  {
    theme: '인물',
    name: '김정은'
  },
  {
    theme: '인물',
    name: '오바마'
  },
  {
    theme: '인물',
    name: '이순신'
  },
  {
    theme: '인물',
    name: '세종대왕'
  },
  {
    theme: '인물',
    name: '펠레'
  },
  {
    theme: '인물',
    name: '빌게이츠'
  },
  {
    theme: '인물',
    name: '스티브잡스'
  },
  {
    theme: '인물',
    name: '마동석'
  },

];

PersonWord.insertMany(PersonWords, function (error, docs) {
  if (error) {
    console.log(error);
  } else {
    console.log("성공했다!! 인물 DB 성공! 확인해보자!");
  }
});

const EquipmentWords = [
  {
    theme: '물건',
    name: '컴퓨터'
  },
  {
    theme: '물건',
    name: '키보드'
  },
  {
    theme: '물건',
    name: '마우스'
  },
  {
    theme: '물건',
    name: '모니터'
  },
  {
    theme: '물건',
    name: '프린터'
  },
  {
    theme: '물건',
    name: '헤드폰'
  },
  {
    theme: '물건',
    name: '노트북'
  },
  {
    theme: '물건',
    name: '휴대폰'
  },
  {
    theme: '물건',
    name: '테이블'
  },
  {
    theme: '물건',
    name: '의자'
  },
  {
    theme: '물건',
    name: '책상'
  },
  {
    theme: '물건',
    name: '책장'
  },
  {
    theme: '물건',
    name: '책'
  },
  {
    theme: '물건',
    name: '컵'
  },
  {
    theme: '물건',
    name: '칫솔'
  },
  {
    theme: '물건',
    name: '부채'
  },
  {
    theme: '물건',
    name: '가위'
  },
  {
    theme: '물건',
    name: '에어팟'
  },
  {
    theme: '물건',
    name: '가방'
  },
  {
    theme: '물건',
    name: '이불'
  },
  {
    theme: '물건',
    name: '자동차'
  },
  {
    theme: '물건',
    name: '비행기'
  },
  {
    theme: '물건',
    name: '그네'
  },
  {
    theme: '물건',
    name: '향수'
  },
  {
    theme: '물건',
    name: '립스틱'
  },
  {
    theme: '물건',
    name: '효자손'
  },
  {
    theme: '물건',
    name: '귀걸이'
  },
  {
    theme: '물건',
    name: '목걸이'
  },
  {
    theme: '물건',
    name: '반지'
  },
  {
    theme: '물건',
    name: '시계'
  },
  {
    theme: '물건',
    name: '거울'
  },
  {
    theme: '물건',
    name: '비트코인'
  },
  {
    theme: '물건',
    name: '이쑤시개'
  },

];

EquipmentWord.insertMany(EquipmentWords, function (error, docs) {
  if (error) {
    console.log(error);
  } else {
    console.log("성공했다!! 물건 DB 성공! 확인해보자!");
  }
});

const JobWords = [
  {
    theme: '직업',
    name: '군인'
  },
  {
    theme: '직업',
    name: '요리사'
  },
  {
    theme: '직업',
    name: '의사'
  },
  {
    theme: '직업',
    name: '변호사'
  },
  {
    theme: '직업',
    name: '디자이너'
  },
  {
    theme: '직업',
    name: '프로그래머'
  },
  {
    theme: '직업',
    name: '학생'
  },
  {
    theme: '직업',
    name: '선생님'
  },
  {
    theme: '직업',
    name: '건축가'
  },
  {
    theme: '직업',
    name: '피아니스트'
  },
  {
    theme: '직업',
    name: '프로게이머'
  },
  {
    theme: '직업',
    name: '축구선수'
  },
  {
    theme: '직업',
    name: '농부'
  },
  {
    theme: '직업',
    name: '택시기사'
  },
  {
    theme: '직업',
    name: '간호사'
  },
  {
    theme: '직업',
    name: '바리스타'
  },
  {
    theme: '직업',
    name: '청소부'
  },
  {
    theme: '직업',
    name: '유투버'
  },
  {
    theme: '직업',
    name: '판사'
  },
  {
    theme: '직업',
    name: '가수'
  },
  {
    theme: '직업',
    name: '과학자'
  },
  {
    theme: '직업',
    name: '파일럿'
  },
  {
    theme: '직업',
    name: '사진작가'
  },
  {
    theme: '직업',
    name: '딜러'
  },
  {
    theme: '직업',
    name: '대장장이'
  },
  {
    theme: '직업',
    name: '스님'
  },
  {
    theme: '직업',
    name: '무당당'
  },
];

JobWord.insertMany(JobWords, function (error, docs) {
  if (error) {
    console.log(error);
  } else {
    console.log("성공했다!! 직업 DB 성공! 확인해보자!");
  }
});
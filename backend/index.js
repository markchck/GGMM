require("dotenv").config(!!process.env.CONFIG ? { path: process.env.CONFIG } : {});
var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var OpenVidu = require("openvidu-node-client").OpenVidu;
var cors = require("cors");
var app = express();

const Server = require("socket.io")

// /* ---------------- 몽고디비 사용 -------------------- 
const mongoose = require("mongoose")
const AnimalWord = require("./models/animals");
const PersonWord = require("./models/Person");
const EquipmentWord = require("./models/equipment");
const MovieWord = require("./models/movies");
const ExercisetWord = require("./models/exercise");
const ProverbWord = require("./models/proverb");
const JobWord = require("./models/job");



mongoose.connect("mongodb://127.0.0.1:27017/namanmu", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} //두번째 인자 부분은 아래에서 설명
);

const db = mongoose.connection;
const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error)
db.once("open", handleOpen); //open 이벤트가 발생 시 handleOpen 실행 
db.on("error", handleError); //error 이벤트가 발생할 때마다 handleError 실행 );


/* ---------------- 몽고디비 사용(끝) -------------------- */

// Enable CORS support
app.use(
  cors({
    origin: "*",
  })
);

var server = http.createServer(app);

// Allow application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Allow application/json
app.use(bodyParser.json());

// Serve static resources if available
app.use(express.static(__dirname + '/public'));

// Serve application
server.listen(5000, () => {
  console.log("Application started");
});

console.warn('Application server connecting to OpenVidu at ' + process.env.OPENVIDU_URL);

var openvidu = new OpenVidu(
  process.env.OPENVIDU_URL,
  process.env.OPENVIDU_SECRET
);

// /* ---------------- Socket.io 사용 -------------------- 
const io = Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

io.on("connection", (socket) => {
  console.log("UserConnected", socket.id);

  socket.on("session_join", (sessionId) => {
    console.log("sessioId : ", sessionId)
    socket.join(sessionId);
  })

  socket.on('mouse_move', ([sessionId, userInfo]) => {
    try {
      socket.broadcast.to(sessionId).emit('cursor', userInfo);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("session_leave", ([sessionId, participantName]) => {
    try {
      socket.broadcast.to(sessionId).emit('deleteCursor', participantName);
    } catch (error) {
      console.log(error);
    }
    socket.leave(sessionId);
  })

  socket.on("exitShareEditing", ([sessionId, participantName]) => {
    console.log("커서 삭제 완료 :", sessionId, participantName);
    try {
      socket.broadcast.to(sessionId).emit('deleteCursor', participantName);
    } catch (error) {
      console.log(error);
    };
  });

  // flip card
  // let cardlist = {};
  // for (let i = 0; i < 36; i++) {
  //   cardlist[i] = false;
  // }
  // socket.on("flipingcard", (sessionId, my_index, cardId, MiniCardIndex) => {
  //  if (cardlist[cardId.i] !== false) {
  //     console.log("This card has already been used.")
  //   }
  //   else {
  //     cardlist[cardId.i] = true;
  //     try {
  //       socket.emit("CardFliped", my_index, cardId.i, MiniCardIndex);
  //       socket.to(sessionId).emit("CardFliped", my_index, cardId.i, MiniCardIndex);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // });

  const AsyncLock = require('async-lock');
  const lock = new AsyncLock();
  let cardlist = {};

  for (let i = 0; i < 36; i++) {
    cardlist[i] = false;
  }

  socket.on("flipingcard", (sessionId, my_index, cardId, MiniCardIndex) => {
    lock.acquire(cardId.i, function (done) {
      if (cardlist[cardId.i] !== false) {
        console.log("This card has already been used.");
        done();
      } else {
        cardlist[cardId.i] = true;
        try {
          socket.emit("CardFliped", my_index, cardId.i, MiniCardIndex);
          socket.to(sessionId).emit("CardFliped", my_index, cardId.i, MiniCardIndex);
        } catch (error) {
          console.log(error);
        }
        done();
      }
    }, function (err, ret) {
      //lock released
    });
  });


  // let cardScoreList = {};
  // for (let i = 0; i < 36; i++) {
  //   cardScoreList[i] = false;
  // }
  // socket.on("score", (red_team, blue_team, sessionId, cardId) => {
  //   if (cardScoreList[cardId.i] !== false) {
  //     console.log("This score has already been scored.")
  //   }
  //   else {
  //     cardScoreList[cardId.i] = true;
  //     try {
  //       socket.to(sessionId).emit("score", red_team, blue_team);
  //       socket.emit("score", red_team, blue_team);
  //     } catch (error) {
  //       console.log(error);
  //     };
  //   }
  // });

  const Scorelock = new AsyncLock();
  let cardScoreList = {};

  for (let i = 0; i < 36; i++) {
    cardScoreList[i] = false;
  }

  socket.on("score", (red_team, blue_team, sessionId, cardId) => {
    Scorelock.acquire(cardId.i, function (done) {
      if (cardScoreList[cardId.i] !== false) {
        console.log("This score has already been scored.");
        done();
      } else {
        cardScoreList[cardId.i] = true;
        try {
          socket.to(sessionId).emit("score", red_team, blue_team);
          socket.emit("score", red_team, blue_team);
        } catch (error) {
          console.log(error);
        }
        done();
      }
    }, function (err, ret) {
      //lock released
    });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  /*-------제시어 틀린거 신호 받기---------*/
  socket.on("wrong", (wrong_answer, sessionId) => {
    console.log(" 틀린 답 : ", wrong_answer);
    try {
      console.log("wrong_answer", wrong_answer, sessionId)
      socket.emit('response_wrong', wrong_answer);
      socket.to(sessionId).emit('response_wrong', wrong_answer);
    } catch (error) {
      console.log(error);
    };
  });

});

// /* ---------------- Socket.io 사용 -------------------- 


app.post("/api/sessions", async (req, res) => {
  var session = await openvidu.createSession(req.body);
  res.send(session.sessionId);
});

app.post("/api/sessions/:sessionId/connections", async (req, res) => {
  var session = openvidu.activeSessions.find(
    (s) => s.sessionId === req.params.sessionId
  );
  if (!session) {
    res.status(404).send();
  } else {
    var connection = await session.createConnection(req.body);
    res.send(connection.token);
  }
});

/* ------- 제시어 받는 api -------- */
let selectedQuestWords = [];

// 미리 데이터베이스에서 하나의 조합을 가져와 캐시에 저장
updateSelectedQuestWords();

function updateSelectedQuestWords() {
  AnimalWord.aggregate([{ $sample: { size: 15 } }], function (error, AnimalWord) {
    if (error) {
      console.log(error);
    } else {
      selectedQuestWords.push(AnimalWord);
    }
  });
  EquipmentWord.aggregate([{ $sample: { size: 15 } }], function (error, EquipmentWord) {
    if (error) {
      console.log(error);
    } else {
      selectedQuestWords.push(EquipmentWord);
    }
  });
  MovieWord.aggregate([{ $sample: { size: 15 } }], function (error, MovieWord) {
    if (error) {
      console.log(error);
    } else {
      selectedQuestWords.push(MovieWord);
    }
  });

}

app.get("/api/sessions/game", async (req, res) => {
  res.send(selectedQuestWords);
});
// });

setInterval(updateSelectedQuestWords, 1000 * 39);

/* ------- 제시어 받는 api -------- */

/** 카드 랜덤 섞기*/
updateRandomCard();
function updateRandomCard() {
  const numbers = Array.from({ length: 35 }, (_, i) => i);
  const randomCard = [];

  for (let i = 0; i < 9; i++) {
    const randomCardIndex = Math.floor(Math.random() * numbers.length);
    randomCard.push(numbers[randomCardIndex]);
    numbers.splice(randomCardIndex, 1);
  }
  console.log("0부터34까지 9개 뽑아", randomCard);
  app.get("/api/sessions/cardindex", async (req, res) => {
    res.send(randomCard);
  });
}
setInterval(updateRandomCard, 1000 * 90);
/** 카드 랜덤 섞기*/

process.on('uncaughtException', err => console.error(err));
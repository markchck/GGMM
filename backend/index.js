require("dotenv").config(!!process.env.CONFIG ? {path: process.env.CONFIG} : {});
var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var OpenVidu = require("openvidu-node-client").OpenVidu;
var cors = require("cors");
var app = express();

const Server = require("socket.io")

// /* ---------------- 몽고디비 사용 -------------------- 
const mongoose = require("mongoose")
const QuestWord = require("./models/theme");

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
  

  // socket join 시켜ㅑ줘야함. socket_session으로

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
  let cardlist = {};
  for (let i = 0; i < 12; i++) {
    cardlist[i] = false;
  }
  socket.on("flipingcard", (sessionId, my_index, cardId) => {
    console.log("My index is: ", my_index, "Flipped card is: ", cardId);
    if (cardlist[cardId.i] !== false) {
      console.log("This card has already been used.")
    }
    else {
      cardlist[cardId.i] = true;
      try {
        console.log("@@@@@@@@@@@@@@@@", cardId);
        socket.emit("CardFliped", cardId.i);
        socket.to(sessionId).emit("CardFliped", cardId.i);
      } catch (error) {
        console.log(error);
      }
    }
  });


  let cardScoreList = {};
  for (let i = 0; i < 12; i++) {
    cardScoreList[i] = false;
  }
  socket.on("score", (red_team, blue_team, sessionId, cardId) => {
   if (cardScoreList[cardId.i] !== false){
      console.log("This score has already been scored.")
    }
    else {
      cardScoreList[cardId.i] = true;
      try {
        socket.to(sessionId).emit("score", red_team, blue_team);
        socket.emit("score", red_team, blue_team);
      } catch (error) {
        console.log(error);
      };
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
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
let selectedQuestWords = null;

// 미리 데이터베이스에서 하나의 조합을 가져와 캐시에 저장
updateSelectedQuestWords();

function updateSelectedQuestWords(){
  QuestWord.aggregate([{ $sample: { size: 15 } }], function(error, QuestWord) {
    if (error) {
      console.log(error);
    } else {
      selectedQuestWords = QuestWord;
      // console.log(selectedQuestWords)
      // res.send(selectedQuestWords)
    }
  });
}

app.get("/api/sessions/game", async (req, res) => {
  // console.log(selectedQuestWords)
  res.send(selectedQuestWords);
});

setInterval(updateSelectedQuestWords, 1000 * 39); //1min

/* ------- 제시어 받는 api -------- */

process.on('uncaughtException', err => console.error(err));
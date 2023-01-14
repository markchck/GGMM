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

/* ---------------- 몽고디비 사용 -------------------- */

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
  console.log("UserConnected hiiii!!!!!");
  
  socket.on("hello", (arg, callback) => {
    console.log(arg);
    callback("got it");
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
app.get("/api/sessions/game", async(req, res) => {
  QuestWord.aggregate([{ $sample: { size: 15 } }], function(error, QuestWord) {
  if (error) {
    console.log(error);
  } else {
    console.log(QuestWord);
    res.send(QuestWord);
  }
});
})
/* ------- 제시어 받는 api -------- */

process.on('uncaughtException', err => console.error(err));
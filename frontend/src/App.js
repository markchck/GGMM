import React, { Component } from "react";
import "./App.css";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import S_words from "./page_info/S_word";
import CreateInvitation from "./page_info/CreateInvitation";
import Main_Screen from "./page_info/Main_Screen";

// Timer
import Main_timer from "./for_game/main_timer";

//Item list

//Item by each team
import AteamItem from "./page_info/A_team_item";
import BteamItem from "./page_info/B_team_item";

// webRTC
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "./UserVideoComponent";
import Score_board from "./page_info/score_board";
// Zustand
import useStore from "./for_game/store";
const APPLICATION_SERVER_URL = "http://localhost:5000/";
// const APPLICATION_SERVER_URL = "https://practiceggmm.shop/";
var timer = 500;

class webCam extends Component {
  constructor(props) {
    super(props);

    let currentTime = new Date().getTime();
    console.log(currentTime);
    console.log("currentTime 확인");

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: "Session" + Math.floor(Math.random() * 100),
      myUserName: "Participant" + currentTime,
      session: undefined,
      publisher: undefined,
      subscribers: [],
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.oneMoregame = this.oneMoregame.bind(this);
  }

  componentDidMount() {
    //초대링크 타고 들어왔을 때 동작하는 part
    window.addEventListener("beforeunload", this.onbeforeunload);
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("sessionId");
    if (sessionId) {
      this.setState({
        myUserName: "Participant" + new Date().getTime(),
        mySessionId: sessionId,
      });
      this.joinSession();
    } else {
      console.log("Invalid Session Link");
    }
  }

  componentDidUpdate() {
    //타이머 동기화
    if (this.state.session !== undefined) {
      this.state.session.on("signal:timer", (event) => {
        let message = JSON.parse(event.data);
        useStore.getState().set_Curtime(message.timer);
        useStore.getState().set_time_change("change");
        useStore.getState().set_cur_round(1);

        this.forceUpdate();
      });
      //점수 동기화
      this.state.session.on("signal:score", (event) => {
        let message = JSON.parse(event.data);
        console.log("시그널 확인(score) : " + message.score);
        useStore.getState().set_CntAns(message.score);
        if (useStore.getState().cur_who_turn === "red") {
          useStore.getState().set_CurRed_cnt(message.score);
        }
        if (useStore.getState().cur_who_turn === "blue") {
          useStore.getState().set_CurBlue_cnt(message.score);
        }
      });

      this.state.session.on("signal:AItem1", (event) => {
        let message = JSON.parse(event.data);
        useStore.getState().set_AItem1(message.AItem1);
      });

      this.state.session.on("signal:AItem2", (event) => {
        let message = JSON.parse(event.data);
        useStore.getState().set_AItem2(message.AItem2);
      });

      this.state.session.on("signal:AItem3", (event) => {
        let message = JSON.parse(event.data);
        useStore.getState().set_AItem3(message.AItem3);
      });

      this.state.session.on("signal:BItem1", (event) => {
        let message = JSON.parse(event.data);
        useStore.getState().set_BItem1(message.BItem1);
      });

      this.state.session.on("signal:BItem2", (event) => {
        let message = JSON.parse(event.data);
        useStore.getState().set_BItem2(message.BItem2);
      });

      this.state.session.on("signal:BItem3", (event) => {
        let message = JSON.parse(event.data);
        useStore.getState().set_BItem3(message.BItem3);
      });

      this.state.session.on("signal:cur_teller", (event) => {
        let message = JSON.parse(event.data);
        useStore.getState().set_cur_teller(message.cur_teller);
      });

      this.state.session.on("signal:pass", (event) => {
        let message = JSON.parse(event.data);
        useStore.getState().set_pass_cnt(message.pass_cnt);
      });

      this.state.session.on("signal:game_end", (event) => {
        let message = JSON.parse(event.data);
        console.log("game over");
        this.forceUpdate();
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  joinSession() {
    this.OV = new OpenVidu();
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        useStore.getState().set_session_change(this.state.session);
        //zustand에 session값 저장
        mySession.on("streamCreated", (event) => {
          var subscriber = mySession.subscribe(event.stream, undefined); // 현재 내 정보를 subscribe하고
          var subscribers = this.state.subscribers; // 현재 state.subscribers에 있는 것을 subscribers에 넣고

          const addSubscriber = (subscriber, subscribers) => {
            subscribers.push(subscriber); // subscribers에 subscriber(나) 를 집어 넣음
            useStore.getState().setGamers({
              name: JSON.parse(event.stream.connection.data).clientData,
              // name: this.state.myUserName,
              streamManager: subscriber,
            });
            return subscribers;
          };

          this.setState({
            subscribers: addSubscriber(subscriber, subscribers),
          });
        });

        mySession.on("streamDestroyed", (event) => {
          var subscribers = this.state.subscribers;
          const deleteSubscriber = (streamManager, subscribers) => {
            let index = subscribers.indexOf(streamManager, 0);
            useStore
              .getState()
              .deleteGamer(JSON.parse(event.stream.connection.data).clientData);
            console.log("deletegamer", useStore.getState().gamers);
            useStore
              .getState()
              .set_player_count(useStore.getState().player_count - 1);
            console.log("플레이어 수  : " + useStore.getState().player_count);
            if (index > -1) {
              subscribers.splice(index, 1);
              return subscribers;
            }
          };

          this.setState({
            subscribers: deleteSubscriber(
              event.stream.streamManager,
              this.state.subscribers
            ),
          });
        });

        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        this.getToken().then((token) => {
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              console.log("여기가 getToken");

              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: "640x480", // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });
              mySession.publish(publisher);

              useStore.getState().setGamers({
                name: this.state.myUserName,
                streamManager: publisher,
              });

              useStore.getState().set_myUserID(this.state.myUserName);
              console.log("publisher setGamers : after");
              console.log(useStore.getState().gamers);
              console.log(useStore.getState().gamers[0].name);
              console.log(useStore.getState().gamers[0].streamManager);
              console.log("id is :  " + useStore.getState().myUserID);
              this.setState({
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }
  oneMoregame() {
    useStore.getState().set_Curtime(1000000);
    useStore.getState().set_time_change("no_change");
    useStore.getState().set_cur_round(0);
    useStore.getState().set_cur_teller(-1);
    useStore.getState().set_turn_state_change("room");
    useStore.getState().set_my_index(10000);
    useStore.getState().set_my_team_win("none");
    this.forceUpdate();
  }
  leaveSession() {
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }
    useStore.getState().clearGamer();

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "Session" + Math.floor(Math.random() * 100),
      myUserName: "Participant",
      publisher: undefined,
    });
    location.replace("http://localhost:3000/");
  }

  sendTimer() {
    console.log(timer);
    const message = {
      timer: timer,
    };

    this.state.session.signal({
      type: "timer",
      data: JSON.stringify(message),
    });
  }
  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;
    return (
      <>
        {this.state.session === undefined ? (
          <div className="container_before_game">
            <div id="join">
              <form className="form-group" onSubmit={this.joinSession}>
                <p>
                  <input
                    className="form-control"
                    class="participant"
                    type="text"
                    id="userName"
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <input
                    className="form-control"
                    class="roomname"
                    type="text"
                    id="sessionId"
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                  />
                </p>
                <p className="text-center">
                  <input
                    class="enter_button"
                    name="commit"
                    type="submit"
                    value=""
                  />
                </p>
              </form>
            </div>
          </div>
        ) : (
          <>
            {useStore.getState().cur_round === 0 ? (
              <div className="main_wait_room">
                <div className="container_main_wait_room">
                  <div className="btn_div">
                    <Button
                      className="exit_button"
                      onClick={this.leaveSession}
                      value="Exit"
                    >
                      Exit
                    </Button>
                    <Button
                      type="submit"
                      className="gameStart_button"
                      onClick={() => this.sendTimer()}
                    >
                      Start
                    </Button>
                    <CreateInvitation mySessionId={mySessionId} />
                  </div>
                  <Main_Screen />
                </div>
              </div>
            ) : (
              <div className="main_wait_room">
                <div className="container">
                  <div id="session"></div>
                  <div className="wide-frame">
                    {/* A팀 프레임 */}
                    <div className="a-screen">
                      <div className="score_box">
                        <div className="box">
                          <div className="A_cur" id="A_currentScore">
                            점수 : <Score_board score={"cur_red"} />
                          </div>
                        </div>
                        <div className="box">
                          <div className="A_total" id="A_totalScore">
                            총점 : <Score_board score={"total_red"} />
                          </div>
                        </div>
                        {/* <AteamItem /> */}
                      </div>
                      <div className="video_box">
                        <div id={0} className="video_frame">
                          {useStore.getState().gamers[0] && (
                            <div className="video_frame">
                              <UserVideoComponent
                                streamManager={
                                  useStore.getState().gamers[0].streamManager
                                }
                                my_name={useStore.getState().gamers[0].name}
                                video_index={0}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="video_box">
                        <div id={1} className="video_frame">
                          {useStore.getState().gamers[2] && (
                            <div className="video_frame">
                              {" "}
                              <UserVideoComponent
                                streamManager={
                                  useStore.getState().gamers[2].streamManager
                                }
                                my_name={useStore.getState().gamers[2].name}
                                video_index={2}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="video_box">
                        <div id={2} className="video_frame">
                          {useStore.getState().gamers[4] && (
                            <div className="video_frame">
                              {" "}
                              <UserVideoComponent
                                streamManager={
                                  useStore.getState().gamers[4].streamManager
                                }
                                my_name={useStore.getState().gamers[4].name}
                                video_index={4}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="item_box">
                        <AteamItem />
                      </div>
                    </div>

                    {/* 중앙 freame */}
                    <div className="mid-screen">
                      {(useStore.getState().gamers[0] ||
                        useStore.getState().gamers[1] ||
                        useStore.getState().gamers[2] ||
                        useStore.getState().gamers[3] ||
                        useStore.getState().gamers[4] ||
                        useStore.getState().gamers[5]) && <Main_timer />}

                      <div>
                        <div className="team_box">
                          <div className="team_turn2">
                            <S_words />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* B팀 프레임 */}
                    <div className="b-screen">
                      <div className="box">
                        <div className="B_total" id="B_totalScore">
                          총점 :
                          <Score_board score={"total_blue"} />
                        </div>
                      </div>
                      <div className="box">
                        <div className="B_cur" id="B_currentScore">
                          점수 :
                          <Score_board score={"cur_blue"} />
                        </div>
                      </div>
                      <div className="video_box">
                        <div id={3} className="video_frame">
                          {useStore.getState().gamers[1] && (
                            <div className="video_frame">
                              <UserVideoComponent
                                streamManager={
                                  useStore.getState().gamers[1].streamManager
                                }
                                my_name={useStore.getState().gamers[1].name}
                                video_index={1}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="video_box">
                        <div id={4} className="video_frame">
                          {useStore.getState().gamers[3] && (
                            <div className="video_frame">
                              <UserVideoComponent
                                streamManager={
                                  useStore.getState().gamers[3].streamManager
                                }
                                my_name={useStore.getState().gamers[3].name}
                                video_index={3}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="video_box">
                        <div id={5} className="video_frame">
                          {useStore.getState().gamers[5] && (
                            <div className="video_frame">
                              <UserVideoComponent
                                streamManager={
                                  useStore.getState().gamers[5].streamManager
                                }
                                my_name={useStore.getState().gamers[5].name}
                                video_index={5}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="item_box">
                        <BteamItem />
                      </div>
                    </div>
                  </div>
                </div>
                {useStore.getState().cur_turn_states === "end" ? (
                  <>
                    {useStore.getState().my_team_win === "none" ? null : (
                      <>
                        {useStore.getState().my_team_win === "win" ? (
                          <div className={"container2"}>
                            <div className="win_board"></div>
                            <div className="win_img"></div>
                            <div className="btn_box">
                              <input
                                type="button"
                                className="restart_room"
                                onClick={this.oneMoregame}
                              />
                            </div>
                            <div className="btn_box2">
                              <input
                                className="leave_room"
                                onClick={this.leaveSession}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className={"container2"}>
                            <div className="lose_board"></div>
                            <div className="lose_img"></div>
                            <div className="btn_box3">
                              <input
                                type="button"
                                id="buttonRestart"
                                className="restart_room"
                                onClick={this.oneMoregame}
                              />
                            </div>
                            <div className="btn_box4">
                              <input
                                type="button"
                                className="leave_room"
                                onClick={this.leaveSession}
                              />
                            </div>
                          </div>
                        )}
                        ;
                      </>
                    )}
                    ;
                  </>
                ) : null}
                ;
              </div>
            )}
          </>
        )}
      </>
    );
  }
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}

export default webCam;

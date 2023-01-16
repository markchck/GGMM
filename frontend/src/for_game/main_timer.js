import React, { useEffect, useState, useRef } from "react";
import useStore from "./store";
import UserVideoComponent from "../UserVideoComponent";


navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

function Main_timer() {
  const { set_CntAns } = useStore();
  const { cur_time, time_state, set_time_change } = useStore();
  const { cur_turn_states, set_turn_state_change, cur_who_turn, set_who_turn } =
    useStore();
  const { cur_round, set_cur_round } = useStore();
  const { curRed_cnt, curBlue_cnt, set_CurRed_cnt, set_CurBlue_cnt } =
    useStore();
  const { curRed_total, set_CurRed_total, curBlue_total, set_CurBlue_total } =
    useStore();
  const { is_my_turn, set_my_turn } = useStore();
  const { is_my_team_turn, set_myteam_turn, setPublishAudio } = useStore();
  const { cur_teller, set_cur_teller } = useStore();

  const {
    myUserID,
    gamers,
    my_index,
    set_my_index,
    player_count,
    set_player_count,
    cur_session,
  } = useStore();

  const { AItem1, AItem2, AItem3, BItem1, BItem2, BItem3 } = useStore();

  const [sec, setSec] = useState(0);
  const [msec, setMsec] = useState(0);
  const time = useRef(0);
  const timer = useRef(null);
  const videoBoxes = useRef(null);
  const currentIndex = useRef(10000);

  const [mic, setMic] = useState(true);


  // function turnOnMicrophone() {
  //   navigator.getUserMedia(
  //     { audio: true },
  //     function (stream) {
  //       const microphone = stream.getAudioTracks()[0];
  //       microphone.enabled = true;
  //     },
  //     function (error) {
  //       console.log("Error: " + error);
  //     }
  //   );
  // }

  // function turnOffMicrophone() {
  //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
  //     navigator.mediaDevices.getUserMedia(
  //       { audio: true }.then(stream =>{
  //         const microphone = stream.getAudioTracks()[0];
  //         if (mic){
  //           microphone.enabled = false;
  //           setMic(false)
  //         }
  //         else{
  //           microphone.enabled = true;
  //           setMic(true)
  //         }
  //       })
  //       .catch(error =>{
  //         console.log("Error: " + error);
  //       })
  //     );
  //   }
  // }

  async function turnOnOffMicrophone() {
    console.log("여기 들어오는가")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const microphone = stream.getAudioTracks()[0];
      if (mic) {
        console.log("여기 들어옴???????", microphone)
        console.log("여기 들어옴??????? 내가 teller 이고 mic가 true", microphone.enabled)
        microphone.enabled = false;
        setMic(false)
        console.log("여기 들어옴???????22222222", microphone.enabled)
      }
      else {
        microphone.enabled = true;
        setMic(true)
        console.log("여기 들어옴???????3333333 나 teller 끝났음", microphone.enabled)
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  useEffect(() => {
    timer.current = setInterval(() => {
      setSec(parseInt(time.current / 100));
      if ((time.current % 60).toString().length === 1) {
        setMsec("0" + (time.current % 60).toString());
      } else {
        setMsec(time.current % 60);
      }
      time.current -= 1;
    }, 10);

    if (time.current < 0) {
      console.log("Time's up!");
      clearInterval(timer.current);
      game_loop();

      timer.current = setInterval(() => {
        setSec(parseInt(time.current / 100));
        if ((time.current % 60).toString().length === 1) {
          setMsec("0" + (time.current % 60).toString());
        } else {
          setMsec(time.current % 60);
        }
        time.current -= 1;
      }, 10);
    }
    return () => clearInterval(timer.current);
  }, [msec]);

  useEffect(() => {
    videoBoxes.current = document.getElementsByClassName("video_box");
  }, []);

  useEffect(() => {
    if (time_state === "change") {
      time.current = cur_time;
      setSec(cur_time);
      setMsec(0);
      set_turn_state_change("first_ready");
      console.log("동기화");
    }
  }, [time_state]);

  useEffect(() => {
    if (cur_round > 1) {
      if (curBlue_cnt > curRed_cnt) {
        set_CurBlue_total(curBlue_total + 1);
        console.log("블루가 이겼습니다.");
      } else if (curBlue_cnt < curRed_cnt) {
        set_CurRed_total(curRed_total + 1);
        console.log("레드가 이겼습니다.");
      } else {
        set_CurBlue_total(curBlue_total + 1);
        set_CurRed_total(curRed_total + 1);
        console.log("비겼습니다.");
      }
      set_CurBlue_cnt(0);
      set_CurRed_cnt(0);
    }
  }, [cur_round]);

  useEffect(() => {
    if (cur_turn_states !== "room") {
      if (cur_round > 0) {
        if (currentIndex.current === my_index) {
          console.log("여기 오는가??111 : is_my_turn === true")
          turnOnOffMicrophone();
        } else if (currentIndex.current !== my_index) {
          console.log("여기 오는가??2222 : is_my_turn === false")
          turnOnOffMicrophone();
        }
      }
    }
  }, [currentIndex.current]);

  useEffect(() => {
    console.log("지금 인덱스는 :" + currentIndex.current);
    // set_cur_teller(currentIndex.current)
    if (currentIndex.current < 10) {
      if (myUserID === { gamers }.gamers[currentIndex.current].name) {
        set_my_turn(true);
      } else {
        set_my_turn(false);
      }
    }

    if (currentIndex.current !== cur_teller) {
      const message = {
        cur_teller: currentIndex.current,
      };
      cur_session && cur_session.signal({
        type: "cur_teller",
        data: JSON.stringify(message),
      });
    }

  }, [currentIndex.current]);

  useEffect(() => {
    console.log("팀 바꼈냐?" + is_my_team_turn);
  }, [is_my_team_turn]);

  const game_loop = () => {
    if (cur_turn_states === "ready") {
      time.current = 2000;
      setSec(20);
      setMsec(0);
      set_turn_state_change("game");
    } else if (cur_turn_states === "game") {
      time.current = 1000;
      setSec(10);
      setMsec(0);
      set_turn_state_change("ready");
      if (cur_round === 6) {
        return () => clearInterval(timer.current);
      } else if (currentIndex.current == player_count - 1) {
        currentIndex.current = 0;
        if (currentIndex.current % 2 == 0) {
          set_who_turn("blue");
        } else {
          set_who_turn("red");
          set_cur_round(cur_round + 1);
        }
      } else if (currentIndex.current % 2 == 0) {
        currentIndex.current += 1;
        set_who_turn("blue");
      } else if (currentIndex.current % 2 == 1) {
        currentIndex.current += 1;
        set_who_turn("red");
        set_cur_round(cur_round + 1);
      }
      set_CntAns(0);
    } else if (cur_turn_states === "first_ready") {
      time.current = 500;
      currentIndex.current = 0;
      set_who_turn("red");
      setSec(5);
      setMsec(0);
      set_turn_state_change("ready");
    }
  };

  return (
    <>
      <div className="team_box">
        <div className="team_turn">
          <center>
            <h6>
              상태 : {cur_turn_states} Timer : {sec}.{msec}
              {currentIndex.current}, round : {cur_round} turn : {cur_who_turn}
              is my turn : {is_my_turn}, 내 인덱스 : {my_index}
            </h6>
          </center>
        </div>
      </div>
      <div className="main_video_box">
        <div id="main_screen" className="main_video_frame">
          {cur_round > 0 &&
            { gamers }.gamers[currentIndex.current] &&
            <UserVideoComponent
              streamManager={
                { gamers }.gamers[currentIndex.current].streamManager
              }
              video_index={currentIndex.current}

            />
          }
        </div>
      </div>
    </>
  );
}

export default Main_timer;

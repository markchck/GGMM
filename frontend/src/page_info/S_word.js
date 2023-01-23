import React, { useEffect, useState } from "react";
import useStore from "../for_game/store";
import useSound from "use-sound";
import good_sound from "../audio/good.mp3";
import bad_sound from "../audio/bad.mp3";
import socket from "../socket/socket";
import Correct from "./correctwrong/Correct";
import Wrong from "./correctwrong/Wrong";
import "./S_word.css";

function S_words() {
  let [show, setShow] = useState([]);

  //ZUSTAND
  const { cnt_answer, set_CntAns, cur_session, cur_turn_states, cur_round } =
    useStore();
  const { is_my_turn, cur_who_turn, my_index, cur_teller } = useStore();
  const { gamerWords, fetchGamerWords } = useStore();

  //USE Sound
  const [good] = useSound(good_sound);
  // const [bad] = useSound(bad_sound);

  let [show_name, setShow_name] = useState("--------");
  let [show_theme, setShow_theme] = useState("");
  const [answer, setAnswer] = useState("");
  let [number, setNumber] = useState(cnt_answer);
  const [showIndex, setShowIndex] = useState(0);
  const { is_my_team_turn, set_myteam_turn } = useStore();
  const { pass_cnt } = useStore();
  const [CorrectAnswer, setCorrectAnswer] = useState(false);
  const [WrongAnswer, setWrongAnswer] = useState(false);

  useEffect(()=>{
    socket.emit("session_join", cur_session.sessionId);
    console.log("session  조인은 동작하는가")
  },[])

  useEffect(async () => {
    if (cur_round !== 0) {
      setShow([]);
      await fetchGamerWords();
    }
  }, [cur_teller]);

  useEffect(() => {
    gamerWords && setShow(gamerWords);
  }, [gamerWords]);

  useEffect(() => {
    if (gamerWords.length > 0 && cur_round > 0) {
      const arr = gamerWords[cur_round - 1];
      setShow_name(arr[showIndex].name);
      setShow_theme(arr[showIndex].theme);
    }
  }, [show, cur_round, showIndex]);

  useEffect(() => {}, [show_name, show_theme]);

  useEffect(() => {
    setNumber(cnt_answer);
  }, [cnt_answer]);
  useEffect(() => {
    if (number !== 0) {
      sendScore();
      if (showIndex < show.length - 1) {
        nextShow();
        good();
      }
    }
  }, [number]);

  useEffect(() => {
    if (
      (my_index % 2 === 0 && cur_who_turn === "red") ||
      (my_index % 2 === 1 && cur_who_turn === "blue")
    ) {
      set_myteam_turn(true);
    } else {
      set_myteam_turn(false);
    }
  }, [cur_who_turn]);

  useEffect(() => {}, [is_my_team_turn]);

  useEffect(() => {
    if (pass_cnt > 0) {
      console.log("pass_cnt 변경", pass_cnt);
      nextShow();
    }
  }, [pass_cnt]);

  const nextShow = () => {
    setShowIndex(showIndex + 1);
  };

  const pass_question = () => {
    const message = {
      pass_cnt: pass_cnt + 1,
    };
    cur_session.signal({
      type: "pass",
      data: JSON.stringify(message),
    });
  };

  const sendScore = () => {
    const message = {
      score: number,
    };
    cur_session.signal({
      type: "score",
      data: JSON.stringify(message),
    });
  };

  const check_Score = (e) => {
    if (show_name === answer) {
      set_CntAns(cnt_answer + 1);
      setCorrectAnswer(true);
      setTimeout(()=>{
        setCorrectAnswer(false)
      },1000)
    } else {
      // bad();
      console.log("wrong", answer, cur_session.sessionId);
      socket.emit("wrong", answer, cur_session.sessionId);
      setWrongAnswer(true);
      setTimeout(()=>{
        setWrongAnswer(false)
      },1000)
    }
    setAnswer("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      check_Score(e);
    }
  };

useEffect(()=>{
  socket.on('response_wrong',(wrong_answer)=>{
    const [bad] = useSound(bad_sound);
    console.log("response_wrong : ", wrong_answer);
    bad();
  });
},[])
  
  return (
    <>
      {(is_my_turn || !is_my_team_turn) && cur_turn_states === "game" && (
        <>
          <h5>
            제시어 : {show_name}, 테마 : {show_theme}
          </h5>
          {is_my_team_turn && cur_turn_states === "game" && (
            <button
              class="w-btn w-btn-gra1_1"
              type="button"
              onClick={pass_question}
            >
              PASS
            </button>
          )}
        </>
      )}
      {!is_my_turn && is_my_team_turn && (
        <>
          <input
            id="Answer_input"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            onKeyDown={(e) => {
              handleKeyPress(e);
            }}
          />
          <h5>테마 : {show_theme}</h5>
          <button class="w-btn w-btn-gra2" type="button">
            제출
          </button>
          {is_my_team_turn && cur_turn_states === "game" && (
            <button
              class="w-btn w-btn-gra1"
              type="button"
              onClick={pass_question}
            >
              PASS
            </button>
          )}
        </>
      )}
      {CorrectAnswer === true ? <Correct answer={answer}/> : null}
      {WrongAnswer === true ? <Wrong answer={answer}/> : null}
    </>
  );
}

export default S_words;
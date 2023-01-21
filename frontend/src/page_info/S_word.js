import React, { useEffect, useState } from "react";
import useStore from "../for_game/store";
import useSound from "use-sound";
import good_sound from "../audio/good.mp3";
import bad_sound from "../audio/bad.mp3";
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
  const [bad] = useSound(bad_sound);

  let [show_name, setShow_name] = useState("--------");
  const [answer, setAnswer] = useState("");
  let [number, setNumber] = useState(cnt_answer);
  const [showIndex, setShowIndex] = useState(0);
  const { is_my_team_turn, set_myteam_turn } = useStore();
  const { pass_cnt } = useStore();

  useEffect(async () => {
    if (cur_round !== 0) {
      setShow([]);
      await fetchGamerWords();
    }
  }, [cur_teller]);

  useEffect(() => {
    setShow(show.concat(gamerWords.map((a) => a.name)));
  }, [gamerWords]);

  useEffect(() => {
    setShow_name(show[showIndex]);
  }, [show]);

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
    setShow_name(show[showIndex + 1]);
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
    } else {
      bad();
    }
    setAnswer("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      check_Score(e);
    }
  };
  return (
    <>
      {(is_my_turn || !is_my_team_turn) && cur_turn_states === "game" && (
        <>
          <h5>{show_name}</h5>
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
    </>
  );
}

export default S_words;

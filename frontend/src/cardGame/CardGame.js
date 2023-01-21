import React, { Component, useEffect, useState, useRef } from "react";
import Cards from "./Flippable_card";
import Cursor from "../multiCursor/cursor";
import "./card.css";
import socket from "../socket/socket";
import useStore from "../for_game/store";

let card_number = 35;

function CardGame({ sessionId, participantName }) {
  const [state, setState] = useState("뒤집은 카드");
  const {
    my_index,
    cur_session,
    card_game_red,
    set_card_game_red,
    card_game_blue,
    set_card_game_blue,
  } = useStore();

  const click_handler = (cardId) => {
    // const clicked_card= document.getElementById(cardId);
    console.log("지금 누른 카드는 : ", cardId);
    socket.emit("flipingcard", sessionId, my_index, cardId);

    if ((my_index + 1) % 2 === 0) {
      console.log("blue : ", card_game_blue);
      socket.emit(
        "score",
        card_game_red,
        card_game_blue + 1,
        sessionId,
        cardId
      );
      const message = {
        Total_score: card_game_red + card_game_blue + 1,
      };

      cur_session &&
        cur_session.signal({
          type: "Total_score",
          data: JSON.stringify(message),
        });
    } else {
      socket.emit(
        "score",
        card_game_red + 1,
        card_game_blue,
        sessionId,
        cardId
      );

      const message = {
        Total_score: card_game_red + card_game_blue + 1,
      };

      cur_session &&
        cur_session.signal({
          type: "Total_score",
          data: JSON.stringify(message),
        });
    }
  };

  useEffect(() => {
    socket.on("score", (red_score, blue_score) => {
      set_card_game_red(red_score);
      set_card_game_blue(blue_score);
      console.log("red, blue", red_score, blue_score);
    });
  }, []);



  socket.on("CardFliped", (gamer_index, flipedCardId) => {
    const clicked_card= document.getElementById(flipedCardId);
    // console.log(clicked_card.className);
    clicked_card.innerHTML = '';
    // clicked_card.parentNode.removeChild(clicked_card);
  });


  return (
    <div>
      <Cursor sessionId={sessionId} participantName={participantName}></Cursor>

      
      {/* <span id="card"> */}
      <div id="card">
        {Array.from({ length: card_number }, (_, i) => (
          // <span key={i} id={`card-${i}`} className="Card_align" onClick={()=>{click_handler(`card-${i}`)}}>
          <span id={i} key={i} className="Card_align" onClick={(event) => {click_handler({i}); event.preventDefault()}}>
          {/* <span key={i} onClick={(event) => {click_handler({i}); event.preventDefault()}}> */}
            <Cards  />
          </span>
        ))}
      </div>
      <center className="score_class"> 
        {red_team} RED : BLUE {blue_team} 
        </center>
    </div>
  );
}
export default CardGame;

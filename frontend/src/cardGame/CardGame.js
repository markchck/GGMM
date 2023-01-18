import React, { Component, useEffect, useState, useRef } from "react";
import Cards from "./Flippable_card";
import Cursor from "../multiCursor/cursor";
import './card.css'
import socket from "../socket/socket";
import useStore from "../for_game/store";

let card_number = 5;

function CardGame({ sessionId, participantName }) {

  const [state, setState] = useState("뒤집은 카드");
  const { my_index } = useStore();
  const [red_team, setRed_team] = useState(0);
  const [blue_team, setBlue_team] = useState(0);

  const click_handler = (cardId) => {
    // const clicked_card= document.getElementById(cardId);
    console.log("지금 누른 카드는 : ", cardId);
    socket.emit("flipingcard", sessionId, my_index, cardId);

    if ((my_index + 1) % 2 === 0) {
      console.log("blue : ", blue_team);
      socket.emit("score", red_team, blue_team+1, sessionId, cardId);
    } else {
      socket.emit("score", red_team+1, blue_team, sessionId, cardId);
    }
  }

  useEffect(() => {
    socket.on("score", (red_score, blue_score) => {
      setRed_team(red_score);
      setBlue_team(blue_score);
      console.log("red, blue",red_score,blue_score)
    });
  }, []);


  return (
    <span>
      <Cursor sessionId={sessionId} participantName={participantName}></Cursor>
      <div>red : {red_team} : blue : {blue_team} </div>
      <span id="card">
        {Array.from({ length: card_number }, (_, i) => (
          // <span key={i} id={`card-${i}`} className="Card_align" onClick={()=>{click_handler(`card-${i}`)}}>
          <span key={i} className="Card_align" onClick={(event) => {click_handler({i}); event.preventDefault()}}>
            <Cards id={i} />
          </span>
        ))}
      </span>
    </span>
  );
}
export default CardGame;
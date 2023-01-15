import React, { Component, useEffect, useState, useRef } from "react";
import Cards from "./Cards";
import Cursor from "../multiCursor/cursor";
import './card.css'
import socket from "../socket/socket";

let card_number = 42;

function CardGame({sessionId, participantName}) {
  

  const [state, setState] = useState("뒤집은 카드");

  function click_handler(cardId){
      const clicked_card= document.getElementById(cardId);
      socket.emit("card_flip", cardId);
      console.log(clicked_card);
  }

  return (
    <span>
      <Cursor sessionId = {sessionId} participantName = {participantName}></Cursor>
      <span id="card">
        {Array.from({ length: card_number }, (_, i) => (
          <span key={i} id={`card-${i}`} className="Card_align" onClick={()=>{
            click_handler(`card-${i}`);

          }}>
            <Cards card={state}/>
          </span>
        ))}
      </span>
    </span>
  );
}
export default CardGame;
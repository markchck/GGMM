import React, { useState, useEffect, useMemo } from 'react';
import CardGame from './CardGame';
import CountDown from './CountDown';
import useStore from '../for_game/store';
import './Card_Game_Boad.css';

// Homepage sound
import useSound from "use-sound";
import homeSound from "../audio/home.mp3"
import Cursor from '../multiCursor/cursor';


export default function Card_Game_Boad({ sessionId, participantName }) {
  const [CountDownShow, setCountDownShow] = useState(true);
  const [homeMusic, { stop }] = useSound(homeSound);
  const { card_game_end } = useStore();

  const elements = document.getElementsByClassName("remove-Click")

  useEffect(() => {
    homeMusic();
  }, [homeMusic]);

  useEffect(() => {
    if (card_game_end === 9){
      stop();    
    }
  }, [card_game_end]);

  setTimeout(() => {
    elements[0].classList.remove("remove-Click")
    setCountDownShow(false)
  }, 3200)


  return (
    <div className='remove-Click Game_Board'>
      <cursor>
      {CountDownShow === true ? <CountDown /> : null}
      <CardGame sessionId={sessionId} participantName={participantName} />
      </cursor>
    </div>
  )
}
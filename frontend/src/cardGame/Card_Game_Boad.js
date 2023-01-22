import React, { useState } from 'react'
import CardGame from './CardGame'
import CountDown from './CountDown'
import './Card_Game_Boad.css'


export default function Card_Game_Boad({sessionId, participantName}) {
  const [CountDownShow, setCountDownShow] = useState(true);
  
  const elements = document.getElementsByClassName("remove-Click")
  

  setTimeout(() => {
    elements[0].classList.remove("remove-Click")
    setCountDownShow(false)
  }, 3200)


  return (
    <div className='remove-Click'>
      {CountDownShow === true? <CountDown />: null}
      <CardGame sessionId={sessionId} participantName={participantName}/>
    </div>
  )
}
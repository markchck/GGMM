import React from 'react'
import CardGame from './CardGame'
import useStore from '../for_game/store'


export default function Card_Game_Boad({sessionId, participantName}) {


  return (
    <div>
      <CardGame sessionId={sessionId} participantName={participantName}/>
    </div>
  )
}

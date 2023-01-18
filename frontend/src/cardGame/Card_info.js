import "./card.css";
import "./flip-transition.css";
import socket from "../socket/socket";

function Card({onClick, id}) {

  socket.on("CardFliped", (gamer_index, flipedCardId) => {
    const clicked_card= document.getElementById(flipedCardId);
    clicked_card.innerHTML = ''
  });


  return (
    <div id ={id} className="card" onClick={onClick}>
      <div className="card-front">Front</div>
      <div className="card-back"></div>
    </div>
  );
}

export default Card;
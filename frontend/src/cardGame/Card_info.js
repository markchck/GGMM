import "./card.css";
import "./flip-transition.css";
import socket from "../socket/socket";

function Card({onClick}) {

  // socket.on("CardFliped", (gamer_index, flipedCardId) => {
  //   const clicked_card= document.getElementById(flipedCardId);
  //   // console.log(clicked_card.className);
  //   // clicked_card.innerHTML = '';
  //   clicked_card.parentNode.removeChild(clicked_card);
  // });


  return (
    <div className="card" onClick={onClick}>
      <div className="card-front"></div>
    </div>
  );
}

export default Card;
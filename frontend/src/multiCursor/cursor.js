import React, { useEffect, useState} from "react";
import io from "socket.io-client";


console.log("연결을 시도합니다");
const socket = io("https://practiceggmm.shop",{
    reconnectionDelayMax: 10000,
})
socket.on("connect", () => {
    console.log("front connected");
});
socket.on("connect_error", (error) => {
    console.log("error : ", error);
    console.log("에러났다!!!!!!!!!!!!!!!!!");
});


const randomRGB = function () {
    let rgb = "";
    rgb += (Math.floor(Math.random() * 90 + 1) + 130).toString(16).padStart(2, "0");
    rgb += (Math.floor(Math.random() * 90 + 1) + 130).toString(16).padStart(2, "0");
    rgb += (Math.floor(Math.random() * 90 + 1) + 130).toString(16).padStart(2, "0");
    return "#" + rgb;
  };

const cursorStyle = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '25px',
  height: '25px',
  background: randomRGB(),
  borderRadius: '50%'
};


function Cursor({sessionId, participantName}){
    const [position, setPosition] = useState({ x: 0, y: 0 });
    

    useEffect(() => {
      socket.emit("session_join", sessionId, participantName);

      window.addEventListener('mousemove', (event) => {
          socket.emit('mouse_move', { x: event.clientX, y: event.clientY }, sessionId , participantName);
      });
    
    socket.on('cursor', (position, participantName) => {
      // console.log("participant 현재 위치는:", participantName, position);
      // setPosition(position);
      setPosition((prevPosition) => {
        const newPostion = { ...prevPosition, [participantName] :position };
        return newPostion;
      })
    });
    }, []);
      
    return (
      <div>
        {Object.values(position).map(({ x, y }) => (
          <div
            key={`${x},${y}`}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              width: '25px',
              height: '25px',
              backgroundColor: 'red',
              borderRadius: '50%'
            }}
          />
        ))}
      </div>
  );
}

  
export default Cursor;
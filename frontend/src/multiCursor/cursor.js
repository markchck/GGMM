import React, { useEffect, useState} from "react";
import io from "socket.io-client";
import useStore from "../for_game/store";



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

socket.emit("hello", "world", (response) => {
    console.log(response);
})

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
  width: '10px',
  height: '10px',
  background: randomRGB(),
  borderRadius: '50%'
};


function Cursor({sessionId}){
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { cur_session } = useStore();
    console.log("yesssss", sessionId);

    useEffect(() => {
      socket.emit("session_join", sessionId);

      window.addEventListener('mousemove', (event) => {
          socket.emit('mouse_move', [{ x: event.clientX, y: event.clientY }, sessionId]);
      });

    socket.on('cursor', (position) => {
      setPosition(position);
    });
    }, []);
      
    return (
    <div style={{ ...cursorStyle, left: position.x, top: position.y }} />
  );
}

  
export default Cursor;
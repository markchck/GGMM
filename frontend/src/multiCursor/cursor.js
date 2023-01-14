import React, { useEffect, useState, useContext } from "react";
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

socket.emit("hello", "world", (response) => {
    console.log(response);
})
  

function Cursor(user_list){
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        window.addEventListener('mousemove', (event) => {
            socket.emit('cursor', { x: event.clientX, y: event.clientY });
        });

    socket.on('cursor', (position) => {
      setPosition(position);
    });
    }, []);
      
    return(<div style={{ cursor: 'pointer' }}>
      This text will have a pointer cursor when hovered
    </div>)
}

  
export default Cursor;
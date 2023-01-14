import React, { useEffect, useState, useContext } from "react";

import io from "socket.io-client"
// const socket = io.connect("http://127.0.0.1:5000")
console.log("연결을 시도합니다");
const socket = io.connect("https://practiceggmm.shop/socket")
socket.on("connect", () => {
    console.log("front connectedddddddddddddddddddd");
});

const user_list =["participant1","participant2"]
window.addEventListener("mousemove", function(event) {
    // console.log("X: " + event.clientX + ", Y: " + event.clientY);
    const userInfo = {user: user_list[0], x: event.clientX , y: event.clientY}
    // socket.emit("mouse_move", {user: user_list[0], x: event.clientX, y: event.clientY })
    socket.emit("mouse_move", userInfo)
});

socket.on("share_location", (userInfo)=>{
    // console.log(userInfo)
})
  

function Cursor(user_list){
    let cursor;
    let user_id = user_list[0]
    const mouseFunc = (e) => {
        let x = e.clientX;
        let y = e.clientY;
        const user_mouse_Info = {};
        user_mouse_Info[user_id] = {
            mousePointer: { top: y, left: x },
            selectedIndex: selectedIndex,
        };
        socket.emit("mouse_move", [user_id, user_mouse_Info, selectedIndex]);
    };

      
    return(
        <>"hihi"</>
    )
  
}

  
export default Cursor;
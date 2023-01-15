import io from "socket.io-client";

const socket = io("https://practiceggmm.shop",{
    reconnectionDelayMax: 10000,
})

socket.on("connect", () => {
    console.log("front connected");
});
socket.on("connect_error", (error) => {
    console.log("error : ", error);
});

export default socket;


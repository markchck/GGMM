// 좌좌 복사하기
import React, { useEffect, useState, useRef } from "react";
import "./Item.css";

const ItemTwoDecal = ({ streamManager }) => {
  
  const videoRef = React.createRef();
  const canvasRef = useRef(null);


  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager, videoRef]);

  useEffect(() => {
    // Add a function to be called every time the video is played
    // videoRef.current.addEventListener("play", () => {
      // Set the canvas dimensions to match the video
      if(canvasRef.current){

        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        const ctx = canvasRef.current.getContext("2d");
        // Draw the video frame-by-frame onto the canvas
        function drawFrame() {
          // Check if the video has ended
          // if (!videoRef.current.paused && !videoRef.current.ended) {
            if (videoRef.current && !videoRef.current.ended) {
              
            // Draw the video frame to the canvas
            // Call this function again to draw the next frame
            // ctx.restore();
            ctx.translate(canvasRef.current.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(
              videoRef.current,
              videoRef.current.videoWidth / 2,
              0,
              videoRef.current.videoWidth / 2,
              videoRef.current.videoHeight,
              videoRef.current.videoWidth / 2,
              0,
              videoRef.current.videoWidth / 2,
              videoRef.current.videoHeight
            );
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            console.log("두번째 아이템 작동합니다.");

            ctx.translate(0, 0);
            ctx.scale(1, 1);
            ctx.drawImage(
              videoRef.current,
              videoRef.current.videoWidth / 2,
              0,
              videoRef.current.videoWidth / 2,
              videoRef.current.videoHeight,
              videoRef.current.videoWidth / 2,
              0,
              videoRef.current.videoWidth / 2,
              videoRef.current.videoHeight
            );
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            // ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            setTimeout(drawFrame, 50);
          }
          // if (!videoRef.current.paused && !videoRef.current.ended) {
          //   if (videoRef.current && !videoRef.current.ended) {
          //   ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          //   const ctx = canvasRef.current.getContext("2d");
          //   ctx.translate(0, 0);
          //   ctx.scale(1, 1);
          //   ctx.drawImage(
          //     videoRef.current,
          //     videoRef.current.videoWidth / 2,
          //     0,
          //     videoRef.current.videoWidth / 2,
          //     videoRef.current.videoHeight,
          //     videoRef.current.videoWidth / 2,
          //     0,
          //     videoRef.current.videoWidth / 2,
          //     videoRef.current.videoHeight
          //   );
          //   ctx.setTransform(1, 0, 0, 1, 0, 0);
          //   // ctx.save();
  
          //   setTimeout(drawFrame, 50);
          // }
        }
        drawFrame();
  
        return ()=>{
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
      }
  }, [videoRef]);

  return (
    <div>
      <canvas style={{ display: "block" }} ref={canvasRef} className="Video_myturn"/>
      <video ref={videoRef} className="Video_myturn Video_hidden" muted/>
    </div>
  );
};

export default ItemTwoDecal;

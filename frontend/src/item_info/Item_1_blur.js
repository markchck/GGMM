// blur 처리하기
import React, { useEffect, useState, useRef } from "react";
import "./Item.css";

const ItemOneBlur = ({ streamManager }) => {

  const videoRef = React.createRef();
  const canvasRef = useRef(null);
  
  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager, videoRef]);


  useEffect(() => {
    // Add a function to be called every time the video is played
    // videoRef.current.addEventListener("play", () => {
      // Set the canvas dimensions to match the video
      if(canvasRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      // Draw the video frame-by-frame onto the canvas
      const ctx = canvasRef.current.getContext("2d");
      
      function drawFrame() {
        // Check if the video has ended
        // if (!videoRef.current.paused && !videoRef.current.ended) {
          if (videoRef.current && !videoRef.current.ended) {
          // Draw the video frame to the canvas
          // Call this function again to draw the next frame
          ctx.restore();
          ctx.translate(canvasRef.current.width, 0);
          ctx.scale(-1, 1);
          ctx.filter = "blur(20px)";
          ctx.drawImage(videoRef.current, 0, 0);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.filter = "none";
          // ctx.save();
          setTimeout(drawFrame, 50);
        }
      }
      drawFrame();

      return ()=>{
        ctx.clearRect(0, 0, 0, 0);
      }

    } 
  }, [videoRef]);

  return (
    <div>
      <video
        style={{ display: "none" }} ref={videoRef} className="Video_myturn"
        />
        <canvas
          style={{ display: "block" }} ref={canvasRef} className="Video_myturn"
        />
    </div>
  );
};

export default ItemOneBlur;

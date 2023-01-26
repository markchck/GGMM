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
    if (canvasRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      const ctx = canvasRef.current.getContext("2d");

      function drawFrame() {
        // Check if the video has ended
        // if (!videoRef.current.paused && !videoRef.current.ended) {
        if (videoRef.current && !videoRef.current.ended) {
          // Draw the video frame to the canvas
          // Call this function again to draw the next frame
          ctx.restore();
          ctx.filter = "blur(20px)";
          ctx.drawImage(videoRef.current, 0, 0);
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.filter = "none";
          setTimeout(drawFrame, 50);
        }
      }
      drawFrame();

      return () => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      };
    }
  }, [videoRef]);

  return (
    <div>
      <canvas
        style={{ display: "block" }}
        ref={canvasRef}
        className="Video_myturn"
      />
      <video ref={videoRef} className="Video_myturn Video_hidden" muted />
    </div>
  );
};

export default ItemOneBlur;

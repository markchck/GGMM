import React, { useEffect } from "react";
import useStore from "./for_game/store";

const OpenViduVideoComponent = ({ streamManager }) => {
  const { cur_round, cur_teller, my_index, gamers, cur_turn_states } = useStore();
  const videoRef = React.createRef();

  useEffect(() => {
    streamManager.stream.audioActive = false
    streamManager.stream.hasAudio = false
    console.log("==========================================스트레스=====================")
    console.log(videoRef.current)
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager, videoRef, cur_round, cur_teller, my_index]);

  

  return (
    <div>
      <video autoPlay ref={videoRef} />
    </div>
  );
};
export default OpenViduVideoComponent;

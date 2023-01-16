import React, { useEffect } from "react";
import useStore from "../for_game/store";

const OpenViduVideoComponent_sulae = ({ streamManager }) => {
  const { cur_round, cur_teller, my_index, gamers, cur_turn_states } = useStore();
  const videoRef = React.createRef();

  useEffect(() => {
    streamManager.stream.audioActive = false
    streamManager.stream.hasAudio = false
    // console.log("11111",streamManager.stream.audioActive)
    // console.log("22222",streamManager.stream.hasAudio)
    // console.log(streamManager)
    console.log("====================나는 술래 여길 타야해요=====================")
    console.log(videoRef.current)
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager, videoRef, cur_round, cur_teller, my_index]);

  

  return (
    <div>
      {console.log(cur_teller, my_index, cur_teller === my_index, "+++++++++나는 술래 제발 여길 타라+++++++++++++++")}
      <video autoPlay ref={videoRef} muted/>
    </div>
  );
};
export default OpenViduVideoComponent_sulae;

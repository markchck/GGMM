import React, { useEffect } from "react";
import useStore from "../for_game/store";
import Shutter from "../shutter_animaiton/shutter";

const OpenViduVideoComponent_sulae = ({ streamManager }) => {
  const { cur_round, cur_teller, my_index, AItem4, BItem4} = useStore();
  const videoRef = React.createRef();

  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager, videoRef, cur_round, cur_teller, my_index]);

  return (
    <div>
      {(AItem4 == true || BItem4 == true) ? <Shutter /> : null}
      <video autoPlay ref={videoRef} muted />
    </div>
  );
};
export default OpenViduVideoComponent_sulae;

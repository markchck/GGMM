import React, { useEffect } from "react";
import useStore from "./for_game/store";

const OpenViduVideoComponent = ({ streamManager }) => {
  const { cur_round, cur_teller, my_index } = useStore();
  const videoRef = React.createRef();

  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager, videoRef, cur_round, cur_teller, my_index]);

  return (
    <div>
      <video autoPlay ref={videoRef} />
    </div>
  );
};
export default OpenViduVideoComponent;

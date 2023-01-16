import React, { useEffect } from "react";
import useStore from "./for_game/store";

const OpenViduVideoComponent = ({ streamManager }) => {
  const { cur_teller, my_index } = useStore();
  const videoRef = React.createRef();

  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager, videoRef]);
  return (
    <div>
      {cur_teller && my_index ? <video autoPlay ref={videoRef} muted/> : <video autoPlay ref={videoRef} />}
      {/* <video autoPlay ref={videoRef} /> */}
    </div>
  );
};

export default OpenViduVideoComponent;

import React, { useEffect } from "react";
import useStore from "./for_game/store";

const OpenViduVideoComponent = ({ streamManager }) => {
  const { myUserID, is_my_turn } = useStore();
  const videoRef = React.createRef();

  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager, videoRef]);
  return (
    <div>
      <video autoPlay ref={videoRef} />
    </div>
  );
};

export default OpenViduVideoComponent;

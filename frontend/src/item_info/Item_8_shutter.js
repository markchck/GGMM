import React, { useEffect, useState } from "react";
import useStore from "../for_game/store";
import Shutter from "../shutter_animaiton/shutter";


const Item_8_shutter = ({ streamManager }) => {
  const { cur_round, cur_teller, my_index, AItem4, BItem4} = useStore();
  const videoRef = React.createRef();

  useEffect(() => {
    streamManager.addVideoElement(videoRef.current);
  }, [streamManager, videoRef, cur_round, cur_teller, my_index]);

  return (
    <div>
      {videoRef && <Shutter />}
      <video autoPlay ref={videoRef} muted />
    </div>
  );
};

export default Item_8_shutter;
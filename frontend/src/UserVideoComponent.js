import React, { Component, useEffect } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

import ItemOneBlur from "./item_info/Item_1_blur";
import ItemTwoDecal from "./item_info/Item_2_decalco";
import ItemThreeCut from "./item_info/Item_3_4cut";

import useStore from "./for_game/store";

const UserVideoComponent = ({ streamManager, my_name, video_index }) => {
  const { myUserID, cur_turn_states, gamers, player_count } = useStore();
  const { red_gamers, red_setGamers, blue_gamers, blue_setGamers } = useStore();
  const {
    is_my_turn,
    my_index,
    AItem1,
    AItem2,
    AItem3,
    BItem1,
    BItem2,
    BItem3,
  } = useStore();
  const { cur_teller } = useStore();

  useEffect(() => {
    console.log("아이템 동작?");
    console.log(
      AItem1,
      BItem1,
      AItem2,
      BItem2,
      AItem3,
      BItem3,
      cur_teller,
      video_index
    );
  }, [AItem1, BItem1, AItem2, BItem2, AItem3, BItem3, cur_teller, video_index]);

  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          {console.log("cur_teller 와 video_index : ", cur_teller, video_index)}
          {!(cur_teller === video_index) ? (
            <OpenViduVideoComponent streamManager={streamManager} />
          ) : AItem3 == true || BItem3 == true ? (
            <ItemThreeCut streamManager={streamManager} />
          ) : AItem2 == true || BItem2 == true ? (
            <ItemTwoDecal streamManager={streamManager} />
          ) : AItem1 == true || BItem1 == true ? (
            <ItemOneBlur streamManager={streamManager} />
          ) : (
            <OpenViduVideoComponent streamManager={streamManager} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;

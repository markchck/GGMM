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
  const { is_my_turn, my_index, AItem1, AItem2, AItem3, BItem1, BItem2, BItem3 } = useStore();
  const { cur_teller } = useStore();
  const change_red_team = () => {
    var i = 0;
    for (i; i < player_count; i++) {
      if (myUserID === { gamers }.gamers[i].name) {
        console.log("내 이름 찾았다!!" + { gamers }.gamers[i].name);
        var j = 0;
        var check_cnt = 0;
        for (j; j < red_gamers.length; j++) {
          if (myUserID === { red_gamers }.red_gamers[j].name) {
            check_cnt += 1;
            console.log("중복값이 있넹");
          }
        }
        console.log(check_cnt);
        if (check_cnt === 0) {
          red_setGamers({
            name: { gamers }.gamers[i].name,
            streamManager: streamManager,
          });
        }
        console.log("레드팀에 저장 : \n", red_gamers);
        break;
      }
    }
  };

  const change_blue_team = () => {
    var i = 0;
    for (i; i < player_count; i++) {
      if (myUserID === { gamers }.gamers[i].name) {
        console.log("내 이름 찾았다!!" + { gamers }.gamers[i].name);
        break;
      }
    }
  };

  useEffect(()=>{
    console.log("아이템 동작?")
    console.log(AItem1, BItem1, AItem2, BItem2, AItem3, BItem3, cur_teller, video_index)
  },[AItem1, BItem1, AItem2, BItem2, AItem3, BItem3, cur_teller, video_index])

  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          {console.log("cur_teller 와 video_index : ", cur_teller, video_index)}
          {!(cur_teller === video_index) ? <OpenViduVideoComponent streamManager={streamManager} /> : 
            (AItem3 == true || BItem3 == true) ? <ItemThreeCut streamManager={streamManager}/> :
            (AItem2 == true || BItem2 == true) ? <ItemTwoDecal streamManager={streamManager}/> :
            (AItem1 == true || BItem1 == true) ? <ItemOneBlur streamManager={streamManager}/> :
            <OpenViduVideoComponent streamManager={streamManager} />
          }
          
          {my_name === myUserID && cur_turn_states === "room" && (
            <>
              <button
                onClick={() => {
                  console.log("레드 팀 변경");
                  change_red_team();
                }}
              >
                {" "}
                red{" "}
              </button>
              <button
                onClick={() => {
                  console.log("블루 팀 변경");
                  change_blue_team();
                }}
              >
                {" "}
                blue{" "}
              </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;

import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";
import ItemOneBlur from "./item_info/Item_1_blur";
import useStore from "./for_game/store";

const UserVideoComponent = ({ streamManager, my_name }) => {
  const { myUserID, cur_turn_states } = useStore();
  console.log("내 이름  ", my_name.name);
  return (
    <div>
      {streamManager !== undefined ? (
        <div>
          <OpenViduVideoComponent streamManager={streamManager} />
          {my_name.name === myUserID && cur_turn_states === "room" && (
            <>
              <button> red </button>
              <button> blue </button>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;

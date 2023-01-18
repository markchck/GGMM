import React, { useState, useEffect } from "react";
import useStore from "../for_game/store";

function BteamItem() {
  const {
    cur_session,
    BItem1,
    BItem2,
    BItem3,
    BsignalSent1,
    BsignalSent2,
    BsignalSent3,
    my_index,
    cur_who_turn,
    is_my_team_turn,
  } = useStore();

  const sendItem1B = () => {
    if (!BsignalSent1) {
      // set_AItem1(true)
      console.log("여기는 시그널을 보내는 곳 : ", BItem1);
      const message = {
        BItem1: true,
        // BsignalSent1: false,
      };

      cur_session &&
        cur_session.signal({
          type: "BItem1",
          data: JSON.stringify(message),
        });

      setTimeout(() => {
        const message = {
          BItem1: false,
        };

        cur_session &&
          cur_session.signal({
            type: "BItem1",
            data: JSON.stringify(message),
          });
      }, 10000);
    }
  };

  const sendItem2B = () => {
    if (!BsignalSent2) {
      // set_AItem2(true)
      console.log("여기는 시그널을 보내는 곳 : ", BItem2);
      const message = {
        BItem2: true,
        // BsignalSent2: false,
      };

      cur_session &&
        cur_session.signal({
          type: "BItem2",
          data: JSON.stringify(message),
        });

      setTimeout(() => {
        const message = {
          BItem2: false,
        };

        cur_session &&
          cur_session.signal({
            type: "BItem2",
            data: JSON.stringify(message),
          });
      }, 10000);
    }
  };

  const sendItem3B = () => {
    if (!BsignalSent3) {
      // set_AItem3(true)
      console.log("여기는 시그널을 보내는 곳 : ", BItem3);
      const message = {
        BItem3: true,
        // BsignalSent3: false,
      };

      cur_session &&
        cur_session.signal({
          type: "BItem3",
          data: JSON.stringify(message),
        });

      setTimeout(() => {
        const message = {
          BItem3: false,
        };

        cur_session &&
          cur_session.signal({
            type: "BItem3",
            data: JSON.stringify(message),
          });
      }, 10000);
    }
  };

  useEffect(() => {}, is_my_team_turn);
  return (
    <>
      {my_index % 2 === 1 && is_my_team_turn === false ? (
        <>
          <button
            className="image-button_blur"
            onClick={() => {
              sendItem1B();
            }}
          ></button>
          <button
            className="image-button_mirr"
            onClick={() => {
              sendItem2B();
            }}
          ></button>
          <button
            className="image-button_4div"
            onClick={() => {
              sendItem3B();
            }}
          ></button>
        </>
      ) : null}
    </>
  );
}

export default BteamItem;

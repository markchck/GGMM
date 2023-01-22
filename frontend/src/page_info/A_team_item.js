import React, { useEffect } from "react";
import useStore from "../for_game/store";

function AteamItem() {
  const {
    cur_session,
    AItem1,
    AItem2,
    AItem3,
    AItem4,
    AsignalSent1,
    AsignalSent2,
    AsignalSent3,
    AsignalSent4,
    my_index,
    is_my_team_turn,
  } = useStore();

  const sendItem1 = () => {
    if (!AsignalSent1) {
      const message = {
        AItem1: true,
      };
      cur_session &&
        cur_session.signal({
          type: "AItem1",
          data: JSON.stringify(message),
        });
      setTimeout(() => {
        const message = {
          AItem1: false,
        };
        cur_session &&
          cur_session.signal({
            type: "AItem1",
            data: JSON.stringify(message),
          });
      }, 7000);
    }
  };

  const sendItem2 = () => {
    if (!AsignalSent2) {
      const message = {
        AItem2: true,
      };
      cur_session &&
        cur_session.signal({
          type: "AItem2",
          data: JSON.stringify(message),
        });
      setTimeout(() => {
        const message = {
          AItem2: false,
        };
        cur_session &&
          cur_session.signal({
            type: "AItem2",
            data: JSON.stringify(message),
          });
      }, 7000);
    }
  };

  const sendItem3 = () => {
    if (!AsignalSent3) {
      const message = {
        AItem3: true,
      };
      cur_session &&
        cur_session.signal({
          type: "AItem3",
          data: JSON.stringify(message),
        });
      setTimeout(() => {
        const message = {
          AItem3: false,
        };
        cur_session &&
          cur_session.signal({
            type: "AItem3",
            data: JSON.stringify(message),
          });
      }, 7000);
    }
  };

  const sendItem4 = () => {
    if (!AsignalSent4) {
      // set_AItem3(true)
      console.log("여기는 시그널을 보내는 곳 : ", AItem4);
      const message = {
        AItem4: true,
        // AsignalSent3: false,
      };

      cur_session &&
        cur_session.signal({
          type: "AItem4",
          data: JSON.stringify(message),
        });

      setTimeout(() => {
        const message = {
          AItem4: false,
        };

        cur_session &&
          cur_session.signal({
            type: "AItem4",
            data: JSON.stringify(message),
          });
      }, 7000);
    }
  };

  useEffect(() => {}, is_my_team_turn);
  return (
    <>
      {my_index % 2 === 0 && is_my_team_turn === false ? (
        <>
          <button
            className="image-button_shutter"
            onClick={() => {
              sendItem4();
            }}
          >
          </button>
          <button
            className="image-button_blur"
            onClick={() => {
              sendItem1();
            }}
          >
            {" "}
          </button>
          <button
            className="image-button_mirr"
            onClick={() => {
              sendItem2();
            }}
          ></button>
          <button
            className="image-button_4div"
            onClick={() => {
              sendItem3();
            }}
          ></button>
        </>
      ) : null}
    </>
  );
}

export default AteamItem;

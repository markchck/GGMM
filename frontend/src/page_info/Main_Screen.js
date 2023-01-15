import React, { useState, useEffect } from "react";
import UserVideoComponent from "../UserVideoComponent";
import useStore from "../for_game/store";
import "./Main_Screen.css";

function Main_Screen() {
  const {
    gamers,
    set_player_count,
    player_count,
    myUserID,
    set_my_index,
    my_index,
    cur_session,
    cur_teller,
  } = useStore();

  useEffect(() => {
    if (cur_session !== undefined) {
      console.log("게이머 정보 추가");
      set_player_count(player_count + 1);
      console.log(gamers);
    }
  }, [gamers]);

  useEffect(() => {
    if (cur_session !== undefined) {
      for (var i = 0; i < player_count; i++) {
        console.log("player count :" + player_count);
        if (myUserID === { gamers }.gamers[i].name) {
          console.log("나의 인덱스 :" + i);
          set_my_index(i);
        }
      }
    }
  }, [player_count]);

  useEffect(() => {
    console.log("인덱스 변경" + my_index);
  }, [my_index]);

  useEffect(() => {
    console.log("cur_teller 변경", cur_teller);

  }, [cur_teller])

  return (
    <>
      <div className="video_box1">
        <div id={0} className="video_frame1">
          {gamers[0] && (cur_teller == 0 ? <div> 이야기 꾼입니다.</div> : 
          <div className="video_frame1">
            <UserVideoComponent
              streamManager={{ gamers }.gamers[0].streamManager}
              my_name={{ gamers }.gamers[0].name}
            />
          </div>)
          }
        </div>
      </div>
      <div className="video_box1">
        <div id={0} className="video_frame1">
          {gamers[1] && (
            <div className="video_frame1">
              <UserVideoComponent
                streamManager={{ gamers }.gamers[1].streamManager}
                my_name={{ gamers }.gamers[1].name}
              />
            </div>
          )}
        </div>
      </div>{" "}
      <div className="video_box1">
        <div id={0} className="video_frame1">
          {gamers[2] && (
            <div className="video_frame1">
              <UserVideoComponent
                streamManager={{ gamers }.gamers[2].streamManager}
                my_name={{ gamers }.gamers[2].name}
              />
            </div>
          )}
        </div>
      </div>
      <div className="video_box1">
        <div id={0} className="video_frame1">
          {gamers[3] && (
            <div className="video_frame1">
              <UserVideoComponent
                streamManager={{ gamers }.gamers[3].streamManager}
                my_name={{ gamers }.gamers[3].name}
              />
            </div>
          )}
        </div>
      </div>
      <div className="video_box1">
        <div id={0} className="video_frame1">
          {gamers[4] && (
            <div className="video_frame1">
              <UserVideoComponent
                streamManager={{ gamers }.gamers[4].streamManager}
                my_name={{ gamers }.gamers[4].name}
              />
            </div>
          )}
        </div>
      </div>
      <div className="video_box1">
        <div id={0} className="video_frame1">
          {gamers[5] && (
            <div className="video_frame1">
              <UserVideoComponent
                streamManager={{ gamers }.gamers[5].streamManager}
                my_name={{ gamers }.gamers[5].name}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Main_Screen;

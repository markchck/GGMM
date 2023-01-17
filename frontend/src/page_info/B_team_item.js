import React, { useState, useEffect } from "react";
import useStore from "../for_game/store";


function BteamItem() {
    const { cur_session, BItem1, BItem2, BItem3, BsignalSent1, BsignalSent2, BsignalSent3, my_index, is_my_team_turn } = useStore();

    const sendItem1B = () => {
        if (!BsignalSent1) {
            // set_AItem1(true)
            console.log("여기는 시그널을 보내는 곳 : ", BItem1);
            const message = {
                BItem1: true,
                BsignalSent1: false,
            };

            cur_session && cur_session.signal({
                type: "BItem1",
                data: JSON.stringify(message),
            });

            setTimeout(() => {
                const message = {
                    BItem1: false,
                };

                cur_session && cur_session.signal({
                    type: "BItem1",
                    data: JSON.stringify(message),
                });

            }, 5000)
        }
    }

    const sendItem2B = () => {
        if (!BsignalSent2) {
            // set_AItem2(true)
            console.log("여기는 시그널을 보내는 곳 : ", BItem2);
            const message = {
                BItem2: true,
                BsignalSent2: false,
            };

            cur_session && cur_session.signal({
                type: "BItem2",
                data: JSON.stringify(message),
            });

            setTimeout(() => {
                const message = {
                    BItem2: false,
                };

                cur_session && cur_session.signal({
                    type: "BItem2",
                    data: JSON.stringify(message),
                });

            }, 5000)
        }
    }

    const sendItem3B = () => {
        if (!BsignalSent3) {
            // set_AItem3(true)
            console.log("여기는 시그널을 보내는 곳 : ", BItem3);
            const message = {
                BItem3: true,
                BsignalSent3: false,
            };

            cur_session && cur_session.signal({
                type: "BItem3",
                data: JSON.stringify(message),
            });

            setTimeout(() => {
                const message = {
                    BItem3: false,
                };

                cur_session && cur_session.signal({
                    type: "BItem3",
                    data: JSON.stringify(message),
                });

            }, 5000)
        }
    }

    return (

        <>
            {my_index % 2 === 1 && !is_my_team_turn?
                <>
                    <button onClick={() => { sendItem1B() }}>Item blur</button>
                    <button onClick={() => { sendItem2B() }}>Item decal</button>
                    <button onClick={() => { sendItem3B() }}>Item 4cut</button>
                </>
                : null}
        </>
    );
}

export default BteamItem;
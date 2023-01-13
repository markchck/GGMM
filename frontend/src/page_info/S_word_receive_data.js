import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import useStore from '../for_game/store';



const APPLICATION_SERVER_URL = "http://localhost:5000/";

function Receive_data() {
    const {gameWord, setGameWord} = useStore()
    /* ------ api 통신하는 곳 ------ */
    async function receiveData() {
        /* ------ api 통신하는 곳 ------ */
        try {
            const response = await axios.get(APPLICATION_SERVER_URL + 'api/sessions/game', {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('여기서 부터 api 수신');
            console.log(response.data);
            {setGameWord}(response.data);
            console.log("이거 저장되나");
            console.log({gameWord});

        } catch (error) {
            console.error(error);
        }
        /* ------ api 통신하는 곳 ------ */
    }

    receiveData();

    return (
        <div>TEST 시작</div>
    );
}

export default Receive_data;
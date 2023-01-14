import create from "zustand";
import axios from "axios";

const APPLICATION_SERVER_URL = "http://localhost:5000/";
// const APPLICATION_SERVER_URL = 'https://practiceggmm.shop/';

const useStore = create((set) => ({
  //치우
  gamers: [],
  setGamers: (gamer) => {
    set((state) => ({
      gamers: [...state.gamers, gamer],
    }));
  },

  deleteGamer: (name) => {
    set((state) => ({
      gamers: state.gamers.filter((a) => a.name !== name),
    }));
  },
  clearGamer: () => {
    set((state) => ({
      gamers: [],
    }));
  },

  red_gamers: [],
  red_setGamers: (gamer) => {
    set((state) => ({
      red_gamers: [...state.gamers, gamer],
    }));
  },

  red_deleteGamer: (name) => {
    set((state) => ({
      red_gamers: state.gamers.filter((a) => a.name !== name),
    }));
  },
  red_clearGamer: () => {
    set((state) => ({
      red_gamers: [],
    }));
  },

  bluegamers: [],
  bluesetGamers: (gamer) => {
    set((state) => ({
      bluegamers: [...state.gamers, gamer],
    }));
  },

  bluedeleteGamer: (name) => {
    set((state) => ({
      bluegamers: state.gamers.filter((a) => a.name !== name),
    }));
  },
  blueclearGamer: () => {
    set((state) => ({
      bluegamers: [],
    }));
  },

  setPublishAudio: (name, newValue) => {
    set((state) => {
      const gamer = state.gamers.find((x) => x.name === name);
      gamer.streamManager.publishAudio = newValue;
      return { gamers: state.gamers };
    });
  },

  myUserID: "none",
  set_myUserID: (input) => set({ myUserID: input }),
  //경준
  cur_time: 1000000,
  set_Curtime: (input) => set({ cur_time: input }),

  time_state: "no_change",
  set_time_change: (input) => set({ time_state: input }),

  cnt_answer: 0,
  set_CntAns: (input) => set(() => ({ cnt_answer: input })),

  //Team 별  round 점수
  curRed_cnt: 0,
  set_CurRed_cnt: (input) => set(() => ({ curRed_cnt: input })),
  curBlue_cnt: 0,
  set_CurBlue_cnt: (input) => set(() => ({ curBlue_cnt: input })),
  curRed_total: 0,
  set_CurRed_total: (input) => set(() => ({ curRed_total: input })),
  curBlue_total: 0,
  set_CurBlue_total: (input) => set(() => ({ curBlue_total: input })),

  cur_session: undefined,
  set_session_change: (input) => set({ cur_session: input }),

  cur_turn_states: "room",
  set_turn_state_change: (input) => set({ cur_turn_states: input }),

  cur_who_turn: "none", //누구 턴인지
  set_who_turn: (input) => set({ cur_who_turn: input }),

  cur_round: 0,
  set_cur_round: (input) => set({ cur_round: input }),

  is_my_turn: false, //내가 이야기 꾼인지?
  set_my_turn: (input) => set({ is_my_turn: input }),

  is_my_team_turn: false,
  set_myteam_turn: (input) => set({ is_my_team_turn: input }),

  my_index: 10000,
  set_my_index: (input) => set({ my_index: input }),

  player_count: 0,
  set_player_count: (input) => set({ player_count: input }),

  gamerWords: [],
  fetchGamerWords: async () => {
    const response = await axios.get(
      APPLICATION_SERVER_URL + "api/sessions/game",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    response &&
      set((state) => ({ gamerWords: (state.gamerWords = response.data) }));
  },

  AItem1: false,
  set_AItem1: (input) => set({ AItem1: input }),
  AsignalSent1: false,
  setASignalSent1: () => set({ AsignalSent1: true }),

  AItem2: false,
  set_AItem2: (input) => set({ AItem2: input }),
  AsignalSent2: false,
  setASignalSent2: () => set({ AsignalSent2: true }),

  AItem3: false,
  set_AItem3: (input) => set({ AItem3: input }),
  AsignalSent3: false,
  setASignalSent3: () => set({ AsignalSent3: true }),

  BItem1: false,
  set_BItem1: (input) => set({ BItem1: input }),
  BsignalSent1: false,
  setBSignalSent1: () => set({ BsignalSent1: true }),

  BItem2: false,
  set_BItem2: (input) => set({ BItem2: input }),
  BsignalSent2: false,
  setBSignalSent2: () => set({ BsignalSent2: true }),

  BItem3: false,
  set_BItem3: (input) => set({ BItem3: input }),
  BsignalSent3: false,
  setBSignalSent3: () => set({ BsignalSent3: true }),
}));

export default useStore;

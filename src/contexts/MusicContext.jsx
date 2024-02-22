import { useEffect, useReducer } from "react";
import { createContext } from "react";
import { getAllAudio, initializeDB } from "../utils/db";

const INITIAL_STATE = {
  musics: [],
  currentPlaying: null,
  currentPlayingTiming: null,
};

const reducer = async (state, action) => {
  switch (action.type) {
    case "CURRENTLYPLAYNGSONG":
      return { ...state, currentPlaying: action.payload.currentPlayingSong };

    case "CURRENTLYPLAYNGTIME":
      return { ...state, currentPlayingTiming: action.payload.currentTime };

    case "ADDMUSIC":
      return {
        ...state,
        musics: [...state.musics, action.payload.musics],
      };

    case "SETMUSIC":
      return { ...state, musics: action.payload.musics };

    default:
      return state;
  }
};

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <MusicContext.Provider
      value={{ Musicstate: state, Musicdispatch: dispatch }}
    >
      {children}
    </MusicContext.Provider>
  );
};

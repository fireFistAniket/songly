import React, { useContext, useEffect, useState } from "react";
import LeftNav from "../components/LeftNav";
import Player from "../components/Player";
import RightNav from "../components/RightNav";
import { MusicContext } from "../contexts/MusicContext";

const Home = ({
  music,
  audio,
  setAudio,
  handelCurrentSong,
  saveCurrentMusic,
  saveCurrentMusicTime,
  audioTime,
  setAudioTime,
}) => {
  const { Musicstate } = useContext(MusicContext);

  return (
    <>
      <div className="flex justify-evenly gap-8">
        <LeftNav />
        <Player
          audioSrc={audio}
          handelCurrentSong={handelCurrentSong}
          saveCurrentMusic={saveCurrentMusic}
          saveCurrentMusicTime={saveCurrentMusicTime}
          audioTime={audioTime}
          setAudioTime={setAudioTime}
        />
        <RightNav music={music} setAudio={setAudio} />
      </div>
    </>
  );
};

export default Home;

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
  saveCurrrentAudioId,
  currentAudioId,
  setCurrentAudioId,
}) => {
  const { Musicstate } = useContext(MusicContext);

  return (
    <>
      <div className='flex justify-evenly gap-8 '>
        <LeftNav />
        <Player
          music={music}
          audioSrc={audio}
          handelCurrentSong={handelCurrentSong}
          saveCurrentMusic={saveCurrentMusic}
          saveCurrentMusicTime={saveCurrentMusicTime}
          audioTime={audioTime}
          setAudioTime={setAudioTime}
          saveCurrrentAudioId={saveCurrrentAudioId}
          currentAudioId={currentAudioId}
          setCurrentAudioId={setCurrentAudioId}
        />
        <RightNav
          music={music}
          setAudio={setAudio}
          setAudioTime={setAudioTime}
        />
      </div>
    </>
  );
};

export default Home;

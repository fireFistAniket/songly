import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Addmusic from "./pages/Addmusic";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./contexts/Authcontext";
import Auth from "./components/Auth";
import {
  getAllAudio,
  getAudioById,
  getCurrentAudio,
  getCurrentAudioId,
  getCurrentAudioTime,
  initializeDB,
  saveCurrentAudio,
  saveCurrentAudioId,
  saveCurrentAudioTimer,
} from "./utils/db";
import { MusicContext } from "./contexts/MusicContext";

function App() {
  const [isSigned, setIsSigned] = useState(true);
  const [isUploaded, setIsUploaded] = useState("");
  const [music, setMusic] = useState([]);
  const [audio, setAudio] = useState({});
  const [audioTime, setAudioTime] = useState({});
  const [currentAudioId, setCurrentAudioId] = useState({});
  const { Authstate, Authdispatch } = useContext(AuthContext);
  const { Musicstate, Musicdispatch } = useContext(MusicContext);

  async function getMusic() {
    try {
      const db = await initializeDB();
      const data = await getAllAudio(db);
      const rest = data[0];
      setMusic(data);
      Musicdispatch({ type: "SETMUSIC", payload: { musics: data } });
      const currentaudioData = await getCurrentAudio(db);
      const currentaudioTime = await getCurrentAudioTime(db);
      const currentaudioId = await getCurrentAudioId(db);
      if (currentaudioData.length > 0) {
        const musicId = currentaudioData[0];
        const musicTime = currentaudioTime[0];
        const currentId = currentaudioId[0];
        setAudio(musicId);
        setAudioTime(musicTime);
        setCurrentAudioId(currentId);
        Musicdispatch({
          type: "CURRENTLYPLAYNGSONG",
          payload: { currentPlayingSong: musicId },
        });
        Musicdispatch({
          type: "CURRENTLYPLAYNGTIME",
          payload: { currentPlayingSong: musicTime },
        });
      } else {
        setAudio(rest);
        const playing = await saveCurrentAudio(db, {
          audioBlob: {},
        });
        const playingTime = await saveCurrentAudioTimer(db, { audioTime: 0 });
        const playingId = await saveCurrentAudioId(db, { audioId: 1 });
        Musicdispatch({
          type: "CURRENTLYPLAYNGSONG",
          payload: { currentPlayingSong: rest },
        });
        Musicdispatch({
          type: "CURRENTLYPLAYNGTIME",
          payload: { currentPlayingSong: "00:00" },
        });
      }

      db.close();
    } catch (error) {
      console.log(error);
    }
  }

  async function saveCurrentMusic(data) {
    const db = await initializeDB();
    try {
      const playing = await saveCurrentAudio(db, data);
      Musicdispatch({
        type: "CURRENTLYPLAYNGSONG",
        payload: { currentPlayingSong: data },
      });
      db.close();
    } catch (error) {
      console.log(error);
    }
  }

  async function saveCurrrentAudioId(data) {
    const db = await initializeDB();
    try {
      const playingId = await saveCurrentAudioId(db, data);
      db.close();
    } catch (error) {
      console.log(error);
    }
  }

  async function saveCurrentMusicTime(time) {
    const db = await initializeDB();
    try {
      const playing = await saveCurrentAudioTimer(db, time);
      Musicdispatch({
        type: "CURRENTLYPLAYNGTIME",
        payload: { currentTime: time },
      });
      db.close();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMusic();
    setIsUploaded(false);
  }, [isSigned, isUploaded]);

  const handelCurrentSong = async (action) => {
    try {
      const db = await initializeDB();
      const data = await getCurrentAudio(db);
      const musicId = data[0].audioBlob;
      if (musicId < 0) {
        return;
      }
      if (action.type === "prev") {
        let count;
        if (currentAudioId.audioId === 1) {
          count = music.length;
        } else {
          count = currentAudioId.audioId - 1;
        }
        console.log(music.length);
        const playIng = await getAudioById(db, count);
        setAudio((prev) => ({
          ...prev,
          audioBlob: playIng,
        }));
        setAudioTime((prev) => ({ ...prev, audioTime: 0 }));
        Musicdispatch({
          type: "CURRENTLYPLAYNGSONG",
          payload: { currentPlayingSong: playIng },
        });
      } else {
        let count;
        if (currentAudioId.audioId === music.length) {
          count = 1;
        } else {
          count = currentAudioId.audioId + 1;
        }
        console.log(music.length);
        const playIng = await getAudioById(db, count);
        setAudio((prev) => ({
          ...prev,
          audioBlob: playIng,
        }));
        setAudioTime((prev) => ({ ...prev, audioTime: 0 }));
        Musicdispatch({
          type: "CURRENTLYPLAYNGSONG",
          payload: { currentPlayingSong: playIng },
        });
      }
      db.close();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("userName");
    if (!user) {
      setIsSigned(false);
    } else {
      setIsSigned(true);
      getMusic();
      // handelCurrentAudio();
    }
  }, [!isSigned, !Authstate.userName]);

  return !isSigned ? (
    <Auth />
  ) : (
    <>
      <Routes>
        <Route
          path="/songly/"
          element={
            <Home
              audio={audio}
              music={music}
              setAudio={setAudio}
              saveCurrentMusic={saveCurrentMusic}
              handelCurrentSong={handelCurrentSong}
              saveCurrentMusicTime={saveCurrentMusicTime}
              audioTime={audioTime}
              setAudioTime={setAudioTime}
              saveCurrrentAudioId={saveCurrrentAudioId}
              currentAudioId={currentAudioId}
              setCurrentAudioId={setCurrentAudioId}
            />
          }
        />
        <Route
          path="/songly/add"
          element={
            <Addmusic
              audio={audio}
              music={music}
              setAudio={setAudio}
              handelCurrentSong={handelCurrentSong}
              setIsUploaded={setIsUploaded}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

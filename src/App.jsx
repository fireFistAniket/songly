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
  getCurrentAudioTime,
  initializeDB,
  saveCurrentAudio,
  saveCurrentAudioTimer,
} from "./utils/db";
import { MusicContext } from "./contexts/MusicContext";

function App() {
  const [isSigned, setIsSigned] = useState(true);
  const [isUploaded, setIsUploaded] = useState("");
  const [music, setMusic] = useState([]);
  const [audio, setAudio] = useState({});
  const [audioTime, setAudioTime] = useState({});
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
      console.log(currentaudioData);
      if (currentaudioData.length > 0) {
        const musicId = currentaudioData[0];
        const musicTime = currentaudioTime[0];
        console.log(musicId);
        setAudio(musicId);
        setAudioTime(musicTime);
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

  async function saveCurrentMusic(id, data) {
    const db = await initializeDB();
    try {
      const playing = await saveCurrentAudio(db, id, data);
      Musicdispatch({
        type: "CURRENTLYPLAYNGSONG",
        payload: { currentPlayingSong: id },
      });
      db.close();
    } catch (error) {
      console.log(error);
    }
  }

  async function saveCurrentMusicTime(id, time) {
    const db = await initializeDB();
    try {
      const playing = await saveCurrentAudioTimer(db, id, time);
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
      const data = await getCurrentAudio();
      const musicId = data[0].audioId;
      if (musicId < 0) {
        return;
      }
      if (action.type === "prev") {
        const playIng = await getAudioById(db, musicId - 1);
        setAudio(playIng);
        Musicdispatch({
          type: "CURRENTLYPLAYNGSONG",
          payload: { currentPlayingSong: playIng.musicData },
        });
      } else {
        const playIng = await getAudioById(db, musicId + 1);
        setAudio(playIng);
        Musicdispatch({
          type: "CURRENTLYPLAYNGSONG",
          payload: { currentPlayingSong: playIng.musicData },
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
          path="/"
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
            />
          }
        />
        <Route
          path="/add"
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

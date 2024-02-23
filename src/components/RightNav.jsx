import React, { useContext } from "react";
import { AuthContext } from "../contexts/Authcontext";

const RightNav = ({ music, setAudio, setAudioTime }) => {
  const { Authstate, Authdispatch } = useContext(AuthContext);

  return (
    <>
      <nav className="my-4 flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <img
            src="/songly/default-dp.png"
            alt="profile pic"
            loading="lazy"
            className="w-12 h-12 rounded-full overflow-hidden"
          />
          <h1 className="text-2xl capitalize font-bold text-white">
            {Authstate.userName}
          </h1>
        </div>
        <div className="flex gap-4 flex-col">
          <h2 className="text-xl capitalize font-semibold">songs</h2>
          <ul className="">
            {music.length > 0 &&
              music.map((item, index) => (
                <li
                  className="flex flex-col items-center gap-2"
                  key={index}
                  onClick={() => {
                    setAudio((prev) => ({
                      ...prev,
                      audioBlob: item.audioBlob,
                    }));
                    setAudioTime((prev) => ({ ...prev, audioTime: 0 }));
                  }}
                >
                  <img src="/songly/music-cover.png" alt="music cover" />
                  <p className="capitalize text-lg font-semibold">
                    {item.audioBlob.musicName}
                  </p>
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default RightNav;

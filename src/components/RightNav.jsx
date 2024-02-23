import React, { useContext } from "react";
import { AuthContext } from "../contexts/Authcontext";
import { FaPowerOff } from "react-icons/fa6";
import { deleteDatabase } from "../utils/db";

const RightNav = ({ music, setAudio, setAudioTime }) => {
  const { Authstate, Authdispatch } = useContext(AuthContext);

  const handelClearOut = async () => {
    try {
      localStorage.removeItem("userName");
      await deleteDatabase();
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className='my-4 flex flex-col items-start gap-4'>
        <div className='flex items-center gap-2 justify-between w-full'>
          <img
            src='/songly/default-dp.png'
            alt='profile pic'
            loading='lazy'
            className='w-12 h-12 rounded-full overflow-hidden'
          />
          <h1 className='text-2xl capitalize font-bold text-white'>
            {Authstate.userName}
          </h1>
          <button
            type='button'
            className='relative right-0 text-2xl'
            onClick={handelClearOut}
          >
            <FaPowerOff />
          </button>
        </div>
        <div className='flex gap-4 flex-col'>
          <h2 className='text-xl capitalize font-semibold'>songs</h2>
          <ul className='overflow-y-scroll h-[40vw]'>
            {music.length > 0 &&
              music.map((item, index) => (
                <li
                  className='flex flex-col items-center gap-2 cursor-pointer'
                  key={index}
                  onClick={() => {
                    setAudio((prev) => ({
                      ...prev,
                      audioBlob: item.audioBlob,
                    }));
                    setAudioTime((prev) => ({ ...prev, audioTime: 0 }));
                  }}
                >
                  <img src='/songly/music-cover.png' alt='music cover' />
                  <p className='capitalize text-lg font-semibold'>
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

import React, { useEffect, useRef, useState } from "react";
import HeaderSearch from "./HeaderSearch";
import { FaCirclePause, FaPlay } from "react-icons/fa6";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import VideoBackgroundComponent from "./VideoBackgroundComponent";

const Player = ({
  music,
  audioSrc,
  handelCurrentSong,
  saveCurrentMusic,
  saveCurrentMusicTime,
  audioTime,
  setAudioTime,
  saveCurrrentAudioId,
  currentAudioId,
  setCurrentAudioId,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      saveCurrentMusicTime({
        id: audioTime.id,
        audioTime: audioRef.current.currentTime,
      });
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      saveCurrentMusic({
        id: audioSrc.id,
        audioBlob: audioSrc.audioBlob,
      });
      let uploadId;
      music.forEach((item, index) => {
        if (areObjectsEqual(item.audioBlob, audioSrc.audioBlob)) {
          uploadId = item.id;
        }
      });
      console.log(uploadId);
      saveCurrrentAudioId({ id: currentAudioId.id, audioId: uploadId });
    }
    setIsPlaying(!isPlaying);
  };

  function areObjectsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  useEffect(() => {
    const blob = new Blob([audioSrc?.audioBlob?.musicData], {
      type: "audio/mp3",
    });

    // Convert Blob to a URL
    const blobUrl = URL.createObjectURL(blob);

    // Set the URL as the audio source
    setAudioUrl(blobUrl);
    setCurrentTime(audioTime.audioTime);
  }, [audioSrc]);

  useEffect(() => {
    const audioElement = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audioElement.currentTime);
      saveCurrentMusicTime({
        id: audioTime.id,
        audioTime: audioElement.currentTime,
      });
    };

    const handleLoadedMetadata = () => {
      setDuration(audioElement.duration);
      audioElement.currentTime = audioTime.audioTime;
    };

    audioElement.addEventListener("timeupdate", handleTimeUpdate);
    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef.current, audioSrc]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <>
      <section className='border-l border-r w-[45vw] px-6 m-4 flex flex-col gap-6'>
        <HeaderSearch />
        <VideoBackgroundComponent isStopped={!isPlaying} />
        <div className='p-4 bg-gray-200 rounded-md shadow-md'>
          <audio ref={audioRef} src={audioUrl} />
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <button
                className='p-2 rounded-full bg-blue-500 text-white'
                onClick={() => handelCurrentSong({ type: "prev" })}
              >
                <TbPlayerTrackPrevFilled />
              </button>
              <button
                className='p-2 rounded-full bg-blue-500 text-white'
                onClick={handlePlayPause}
              >
                {isPlaying ? <FaCirclePause /> : <FaPlay />}
              </button>
              <button
                className='p-2 rounded-full bg-blue-500 text-white'
                onClick={() => handelCurrentSong({ type: "aft" })}
              >
                <TbPlayerTrackNextFilled />
              </button>
            </div>
            <div className='flex items-center space-x-2'>
              <span className='text-gray-600'>{formatTime(currentTime)}</span>
              <div className={`w-80 h-1 bg-gray-400 rounded-full`}>
                <div
                  className={`h-full bg-blue-500 rounded-full`}
                  style={{
                    width: `${((currentTime / duration) * 100).toFixed(0)}%`,
                  }}
                ></div>
              </div>
              <span className='text-gray-600'>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Player;

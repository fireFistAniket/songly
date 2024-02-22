import React, { useEffect, useRef } from "react";

const VideoBackgroundComponent = ({ isStopped }) => {
  const videoRef = useRef(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    if (isStopped) {
      video.pause();
    } else {
      video.play();
    }
  }, [isStopped, videoRef.current]);

  return (
    <div className="relative h-[50vh]">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        ref={videoRef}
        autoPlay
        loop
        muted
      >
        {/* Replace this source URL with your video URL */}
        <source src="/now-playing-bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content overlay */}
    </div>
  );
};

export default VideoBackgroundComponent;

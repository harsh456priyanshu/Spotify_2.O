import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const NowPlayingBar = ({ nowPlaying }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [nowPlaying]);

  if (!nowPlaying) return null;

  return (
    <div className='fixed bottom-0 left-0 right-0 bg-black text-white z-50 shadow-lg p-4'>
      <audio ref={audioRef} src={nowPlaying.preview} />

      <div className='flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto'>
        {/* Info */}
        <div className='flex items-center gap-4 w-full md:w-auto'>
          <img
            src={nowPlaying.thumbnailUrl || nowPlaying.album?.cover}
            alt='cover'
            className='w-14 h-14 rounded-md object-cover'
          />
          <div>
            <p className='font-semibold truncate'>{nowPlaying.title}</p>
            <p className='text-sm text-gray-400 truncate'>{nowPlaying.artist?.name || nowPlaying.artist}</p>
          </div>
        </div>

        {/* Controls */}
        <div className='flex flex-col md:flex-1 w-full'>
          <input
            type='range'
            min='0'
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className='w-full accent-green-500'
          />
          <div className='flex justify-between text-xs text-gray-400'>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Play / Pause */}
        <div className='w-full md:w-auto flex justify-center md:justify-end'>
                 <button
          onClick={togglePlay}
          className='bg-green-500 px-4 py-2 rounded hover:bg-green-600 w-full md:w-auto'
        >
          {isPlaying ? <FontAwesomeIcon icon={faPause} className="text-white text-xl" />
 : <FontAwesomeIcon icon={faPlay} className="text-white text-xl" />
}
        </button>
        </div>
       
      </div>
    </div>
  );
};

export default NowPlayingBar;

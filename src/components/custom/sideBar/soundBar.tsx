'use client';
import { audioPlayAtom } from '@/data/atom';
import { useAtom } from 'jotai';
import {
  PauseCircle,
  PlayCircle,
  StopCircle,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function SoundBar() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioState, setAudioState] = useState<number>(2);
  const [audioPlay, setAudioPlay] = useAtom(audioPlayAtom);
  /* 
    0 : playing
    1 : paused
    2 : stopped
    3 : muted
    4 : unmuted
  */

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      audioRef.current.muted = false;
      setAudioState(0);
      setAudioPlay(false);
    }
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setAudioState(1);
    setAudioPlay(false);
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioState(2);
      setAudioPlay(false);
    }
  };

  const handleMute = () => {
    if (audioRef.current) {
      if (audioState === 0 || audioState === 4) {
        audioRef.current.muted = true;
        setAudioState(3);
      } else {
        audioRef.current.muted = false;
        setAudioState(4);
      }
    }
    setAudioPlay(false);
  };

  useEffect(() => {
    if (audioPlay) {
      handlePlay();
    }
  }, [audioPlay]);

  return (
    <div className="fixed top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-sm z-20">
      <audio ref={audioRef} loop>
        <source src="/music/bgm.mp3" type="audio/mp3" />
      </audio>
      <div className="flex gap-2">
        <button id="play" onClick={handlePlay}>
          <PlayCircle
            className={`${
              audioState === 0 && 'text-red-500'
            } hover:scale-110 duration-150`}
          />
        </button>
        <button onClick={handlePause}>
          <PauseCircle
            className={`${
              audioState === 1 && 'text-red-500'
            } hover:scale-110 duration-150`}
          />
        </button>
        <button onClick={handleStop}>
          <StopCircle
            className={`${
              audioState === 2 && 'text-red-500'
            } hover:scale-110 duration-150`}
          />
        </button>
        <button onClick={handleMute}>
          {audioState === 4 || audioState === 0 ? (
            <VolumeX
              className={`${
                audioState === 4 && 'text-red-500'
              } hover:scale-110 duration-150`}
            />
          ) : (
            <Volume2
              className={`${
                audioState === 3 && 'text-red-500'
              } hover:scale-110 duration-150`}
            />
          )}
        </button>
      </div>
    </div>
  );
}

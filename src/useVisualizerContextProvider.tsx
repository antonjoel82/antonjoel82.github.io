import { useEffect, useRef } from "react";
import { useState } from "react";
import * as THREE from "three";
import { AnimatorFn } from "./VisualizerContext";

export interface VisualizerContextProviderProps {
  fftSize?: number;
}

export const useVisualizerContextProvider = ({ fftSize = 256 }) => {
  const song = useRef<THREE.PositionalAudio>();
  const analyzerRef = useRef<THREE.AudioAnalyser>();
  const [animatorRegistry, setAnimatorRegistry] = useState<
    Record<string, AnimatorFn>
  >({});
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  function toggleMusicPlaying() {
    const _song = song.current;
    if (_song) {
      if (isMusicPlaying) {
        _song.setRefDistance(2000);
        _song.pause();
      } else {
        _song.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  }

  // Set the analyzer to point to the song any time it or the fftSize changes
  useEffect(() => {
    if (song.current) {
      analyzerRef.current = new THREE.AudioAnalyser(song.current, fftSize);
    }
  }, [song.current, fftSize]);

  useEffect(() => {
    if (song.current?.isPlaying && !isMusicPlaying) {
      song.current?.stop();
    }
  }, [isMusicPlaying, song.current]);
  

  const handleSongEnded = () => {
    // ensure it's stopped
    song.current?.stop();
    setIsMusicPlaying(false);
  };

  const registerAnimator = (key: string, animator: AnimatorFn) => {
    console.log("Registering animator", key);
    setAnimatorRegistry({
      ...animatorRegistry,
      [key]: animator,
    });
  };

  const removeAnimator = (key: string) => {
    const updatedRegistry = {
      ...animatorRegistry,
    };

    delete updatedRegistry[key];

    setAnimatorRegistry(updatedRegistry);
  };

  return {
    song,
    analyzerRef,
    animatorRegistry,
    registerAnimator,
    removeAnimator,
    toggleMusicPlaying,
    handleSongEnded,
    isMusicPlaying,
  };
};

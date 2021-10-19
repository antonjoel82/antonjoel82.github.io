import React from "react"
import "./App.css";
import { useVisualizer } from "./useVisualizer";

export const Controls: React.FC = () => {
  const { toggleMusicPlaying, isMusicPlaying } = useVisualizer();
  return (
    <button
      aria-label="play"
      className="toggleMusicBtn"
      onClick={toggleMusicPlaying}
    >
      {!isMusicPlaying ? "Play" : "Pause"}
    </button>
  );
};
import { createContext, createRef, MutableRefObject } from "react";

export interface FrequencyData {
  rawFrequencies: Uint8Array;
};
export type AnimatorFn = (frequencyData: FrequencyData) => void;

export interface VisualizerContextData {
  song: MutableRefObject<THREE.PositionalAudio | undefined>;
  analyzerRef: MutableRefObject<THREE.AudioAnalyser | undefined>;
  animatorRegistry: Record<string, AnimatorFn>;
  registerAnimator: (key: string, animator: AnimatorFn) => void;
  removeAnimator: (key: string) => void;
  handleSongEnded: () => void;
  isMusicPlaying: boolean;
  toggleMusicPlaying: () => void;
}

const INITIAL_CONTEXT_DATA: VisualizerContextData = {
  song: createRef() as MutableRefObject<THREE.PositionalAudio>,
  analyzerRef: createRef() as MutableRefObject<THREE.AudioAnalyser>,
  animatorRegistry: {},
  registerAnimator() {},
  removeAnimator() {},
  handleSongEnded() {},
  isMusicPlaying: false,
  toggleMusicPlaying() {},
};

export const VisualizerContext = createContext<VisualizerContextData>(INITIAL_CONTEXT_DATA);

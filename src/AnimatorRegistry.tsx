import { useFrame } from "@react-three/fiber";
import React from "react";
import { useVisualizer } from "./useVisualizer";
import { FrequencyData } from "./VisualizerContext";

export const AnimatorRegistry: React.FC = () => {
  const { analyzerRef, animatorRegistry } = useVisualizer();

  useFrame(() => {
    if (!analyzerRef.current) {
      return;
    }

    const rawFrequencies =  analyzerRef.current.getFrequencyData();
    const frequencyData: FrequencyData = {
      rawFrequencies
    }

    Object.values(animatorRegistry).forEach((animator) => animator(frequencyData))
  });

  return <></>;
}
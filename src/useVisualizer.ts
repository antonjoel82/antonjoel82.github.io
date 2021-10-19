import { useContext } from "react";
import { VisualizerContext } from "./VisualizerContext";

export const useVisualizer = () => {
  const contextData = useContext(VisualizerContext);
  // const { animatorRegistry, analyzerRef } = contextData;


  // useFrame(() => {
  //   if (!analyzerRef.current) {
  //     return;
  //   }

  //   const rawFrequencies =  analyzerRef.current.getFrequencyData();
  //   const frequencyData: FrequencyData = {
  //     rawFrequencies
  //   }

  //   Object.values(animatorRegistry).forEach((animator) => animator(frequencyData))
  // });

  return contextData;
};

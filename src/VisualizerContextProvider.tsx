import { Canvas as ThreeCanvas, useFrame } from "@react-three/fiber";
import React from "react";
import { AnimatorRegistry } from "./AnimatorRegistry";
import { useVisualizer } from "./useVisualizer";
import { useVisualizerContextProvider } from "./useVisualizerContextProvider";
import { FrequencyData, VisualizerContext } from "./VisualizerContext";

export interface VisualizerContextProviderProps {
  fftSize?: number;
}

export const VisualizerContextProvider: React.FC<VisualizerContextProviderProps> = ({ fftSize, children }) => {
  const contextData = useVisualizerContextProvider({ fftSize });
  return (
    <VisualizerContext.Provider value={contextData}>
      {children}
    </VisualizerContext.Provider>
  );
};

export const withVisualizer = (CanvasEl: typeof ThreeCanvas) => {
  return ({ children, ...props }: any) => (
    <VisualizerContext.Consumer>
      {value => (
        <CanvasEl {...props}>
          <VisualizerContext.Provider value={value}>
            <AnimatorRegistry />
            {children}
          </VisualizerContext.Provider>
        </CanvasEl>
      )}
    </VisualizerContext.Consumer>
  );
}

export const VisualizerCanvas = withVisualizer(ThreeCanvas);

import "./App.css";
import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import { MyPositionalAudio } from "./MyPositionalAudio";
import { AnimatorFn, VisualizerContext } from "./VisualizerContext";
import { useVisualizerContextProvider } from "./useVisualizerContextProvider";
import { DiscoBall } from "./DiscoBall";
import { VisualizerCanvas, VisualizerContextProvider } from "./VisualizerContextProvider";
import { Controls } from "./Controls";
import { AudioMain } from "./AudioMain";

function App() {
  return (
    <div className="App">
      <VisualizerContextProvider>
        <VisualizerCanvas>
          <ambientLight intensity={0.2} />
          <directionalLight
            position={[-8, -15, 3]}
            intensity={50}
            color={new THREE.Color("#e4a215")}
          />
          <directionalLight
            position={[8, -15, 3]}
            intensity={50}
            color={new THREE.Color("#f11616")}
          />
          <OrbitControls enablePan enableZoom enableRotate />
          <Suspense fallback={null}>
            <AudioMain />
          </Suspense>
        </VisualizerCanvas>
        <Controls />
      </VisualizerContextProvider>
    </div>
  );
}

export default App;

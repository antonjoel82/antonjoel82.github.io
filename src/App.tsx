import "./App.css";
import React, { Suspense } from "react";
import { OrbitControls, Stats } from "@react-three/drei";
import * as THREE from "three";

import { VisualizerCanvas, VisualizerContextProvider } from "./VisualizerContextProvider";
import { Controls } from "./Controls";
import { AudioMain } from "./AudioMain";
import { Sprites } from "./Sprites";
import { ClassySprites } from "./ClassySprites";

function App() {
  return (
    <div className="App">
      <VisualizerContextProvider>
        <VisualizerCanvas>
          <ambientLight intensity={0.2} />
          {/* <directionalLight
            position={[-8, -15, 3]}
            intensity={50}
            color={new THREE.Color("#e4a215")}
          /> */}
          <directionalLight
            position={[8, -15, 3]}
            intensity={50}
            color={new THREE.Color("#f11616")}
          />
          <ClassySprites numInstances={100} />
          <OrbitControls enablePan enableZoom enableRotate />
          <Suspense fallback={null}>
            <AudioMain />
          </Suspense>
          <Stats />
        </VisualizerCanvas>
        <Controls />
      </VisualizerContextProvider>
    </div>
  );
}

export default App;

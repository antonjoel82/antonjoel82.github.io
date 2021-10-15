import "./App.css";
import React, { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PositionalAudio } from "@react-three/drei";
import { EffectComposer, Bloom, SMAA } from "@react-three/postprocessing";
import { DiscoBall } from "./DiscoBall";
import * as THREE from "three";

function App() {
  const sound = useRef<any>();
  const [play, setPlay] = useState<boolean>(true);

  // Added a button to pause the music.
  function playMusic() {
    if (play) {
      sound.current?.pause();
    } else {
      sound.current?.play();
    }
    setPlay(!play);
  }

  return (
    <div className="App">
      <Canvas>
        <ambientLight intensity={1} />
        {/* <directionalLight position={[-8, -15, 3]} intensity={5} color={new THREE.Color("#e4a215")} />
        <directionalLight position={[8, -15, 3]} intensity={5} color={new THREE.Color("#f11616")} /> */}
        <Suspense fallback={null}>
          <PositionalAudio url="/ColoursAndLights.mp3" distance={10} loop ref={sound} />
          <DiscoBall
            position={[0, 0, -10]}
            minRadius={0.015}
            sound={sound}
          />
          {/* <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0}
              luminanceSmoothing={0.8}
            />
            <SMAA />
          </EffectComposer> */}
          <Environment preset="night" background />
        </Suspense>
      </Canvas>
      <button
        aria-label="play"
        className="toggleMusicBtn"
        onClick={playMusic}
      >
        {!play ? "Play" : "Pause"}
      </button>
    </div>
  );
}

export default App;

import "./App.css";
import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { DiscoBall } from "./DiscoBall";
import * as THREE from "three";
import { MyPositionalAudio } from "./MyPositionalAudio";

function App() {
  const sound = useRef<THREE.Audio>(null);
  const [play, setPlay] = useState<boolean>(false);

  // Added a button to pause the music.
  function playMusic() {
    const _sound = sound.current;
    if (_sound) {
      if (play) {
        _sound.pause();
      } else {
        _sound.play();
      }
      setPlay(!play);
    }
  }

  useEffect(() => {
    if (sound.current?.isPlaying && !play) {
      sound.current?.stop();
    }
  }, [play, sound.current])

  return (
    <div className="App">
      <Canvas>
        <ambientLight intensity={1} />
        {/* <directionalLight position={[-8, -15, 3]} intensity={5} color={new THREE.Color("#e4a215")} />
        <directionalLight position={[8, -15, 3]} intensity={5} color={new THREE.Color("#f11616")} /> */}
        <Suspense fallback={null}>
          <MyPositionalAudio url="/ColoursAndLights.mp3" distance={10} loop={false} ref={sound} autoplay={false} />
          <DiscoBall
            position={[0, 0, -10]}
            minRadius={0.015}
            sound={sound}
          />
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

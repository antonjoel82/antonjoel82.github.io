import "./App.css";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, Vector3 } from "@react-three/fiber";
import { mean } from "lodash";
import { DiscoBallMesh } from "./DiscoBallMesh";

export interface DiscoBallProps {
  position: Vector3;
  minRadius: number;
  sound: React.MutableRefObject<THREE.Audio | null>;
  rotationPerFrame?: number;
}

export function DiscoBall({ position, minRadius, sound, rotationPerFrame = -0.005 }: DiscoBallProps) {
  // const mesh = useRef<any>();
  const mesh = useRef<THREE.Group>(null);
  const minBass = useRef<number>(255);

  /*
    We want the scale of the frequency data (0 - 255) to map to the scale of the discoBalls.
     */
  function adjustScale(
    scale: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ) {
    return ((scale - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  /*
   * Each discoBall is getting its own analyzer node.
   * This sets the scale of the discoBalls as the music plays.
   * Setting the size to every second index of the frequency data.
   */
  function Analyzer({ sound: analyzerSound }: { sound: any }) {
    const analyzer = useRef<THREE.AudioAnalyser>();

    useEffect(() => {
      analyzer.current = new THREE.AudioAnalyser(analyzerSound.current, 256);
    }, [analyzerSound]);

    useFrame(() => {
      if (mesh.current) {
        mesh.current.rotation.y += rotationPerFrame;
        if (analyzer.current) {
          const data = analyzer.current.getFrequencyData();

          // console.log(data);
          const avgBass = mean(data.slice(0, 8));

          // console.log("sphere", { avgBass, rotX: mesh.current.rotation.x, minBass: minBass.current });

          const bassScalar = Math.max(avgBass - minBass.current, 0);

          const scale = minRadius + bassScalar / 10000;
          mesh.current.scale.x = scale;
          mesh.current.scale.y = scale;
          mesh.current.scale.z = scale;

          minBass.current = avgBass < minBass.current && avgBass > 0 ? avgBass : minBass.current;
        }
      }
    });

    return <></>;
  }

  return (
    <>
      <DiscoBallMesh ref={mesh}/>
      <Analyzer sound={sound} />
    </>
  );
}

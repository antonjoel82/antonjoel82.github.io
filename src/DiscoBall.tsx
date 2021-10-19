import "./App.css";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame, Vector3 } from "@react-three/fiber";
import { mean } from "lodash";
import { DiscoBallMesh } from "./DiscoBallMesh";
import { useMount, useUnmount } from "react-use";
import { useVisualizer } from "./useVisualizer";
import { AnimatorFn, FrequencyData } from "./VisualizerContext";

export interface DiscoBallProps {
  position: Vector3;
  scale: number;
  minRadius: number;
  rotationPerFrame?: number;
}

const ANIMATOR_KEY = "DiscoBall";
export function DiscoBall({ minRadius, scale, rotationPerFrame = -0.005 }: DiscoBallProps) {
  const mesh = useRef<THREE.Group>(null);
  const minBass = useRef<number>(255);

  const { registerAnimator, removeAnimator } = useVisualizer();

  useMount(() => {
    registerAnimator(ANIMATOR_KEY, ({ rawFrequencies }: FrequencyData) => {
      if (mesh.current) {
        const bass = mean(rawFrequencies.slice(0, 8))
        const bassScalar = Math.max(bass - minBass.current, 0);
  
        const adjScale = minRadius + bassScalar / 10000;
        mesh.current.scale.x = adjScale;
        mesh.current.scale.y = adjScale;
        mesh.current.scale.z = adjScale;
  
        minBass.current = adjScale < minBass.current && adjScale > 0 ? adjScale : minBass.current;
      }
    });
  })

  useUnmount(() => removeAnimator(ANIMATOR_KEY));

  useFrame(() => {
    if (mesh.current && rotationPerFrame) {
      mesh.current.rotation.y += rotationPerFrame;
    }
  });

  return (
    <DiscoBallMesh ref={mesh}/>
  );
}

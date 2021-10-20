import * as THREE from "three";
import React from "react";
import { PointsMaterialProps } from "@react-three/fiber";

export interface SpritesProps extends Partial<PointsMaterialProps> {
  imgUrl: string;
  numInstances: number;
  
}

const DEFAULT_SPRITE_SIZE = 2;
const DEFAULT_ALPHA_TEST = 0.5;

export const Sprites: React.FC<SpritesProps> = ({ imgUrl, numInstances, ...pointsProps }) => {
  const geometry = new THREE.BufferGeometry();
  const vertices = [];

  const sprite = new THREE.TextureLoader().load(imgUrl);

  for (let count = 0; count < numInstances; count++) {
    const x = 200 * Math.random() - 100;
    const y = 200 * Math.random() - 100;
    const z = 200 * Math.random() - 100;

    vertices.push(x, y, z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  return (
    <points args={[geometry]}>
      <pointsMaterial
        size={DEFAULT_SPRITE_SIZE}
        alphaTest={DEFAULT_ALPHA_TEST}
        {...pointsProps}
        map={sprite}
      />
    </points>
  );
};


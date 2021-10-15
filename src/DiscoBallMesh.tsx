import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export type DiscoBallMeshProps = any;

const gltfUrl = "/disco_ball.gltf";

export const DiscoBallMesh = React.forwardRef<THREE.Group, DiscoBallMeshProps>(({ rotation, scale, ...props }, ref) => {
  const gltf = useLoader(GLTFLoader, gltfUrl)
  return (
    <group ref={ref} {...props} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  )
});

useGLTF.preload(gltfUrl);

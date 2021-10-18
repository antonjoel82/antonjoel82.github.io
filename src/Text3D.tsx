import * as THREE from "three"
import React, { useMemo, useRef, useLayoutEffect } from "react"
import { extend, GroupProps } from "@react-three/fiber"
import { TextGeometry, TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry"
import { ColorRepresentation } from "three"


extend({ TextGeometry })

type HorizontalTextAlign = "left" | "right" | "center";
type VerticalTextAlign = "top" | "bottom" | "middle";

const FONT_SIZE_SCALE = 16;
const FONT_DEPTH_SCALE = 200;

export interface Text3DProps extends GroupProps, TextGeometryParameters {
  hAlign?: HorizontalTextAlign;
  vAlign?: VerticalTextAlign;
  color?: ColorRepresentation;
  size?: number;
  depth?: number;
}

export const Text3D: React.FC<Text3DProps> = ({
  children,
  vAlign = "center",
  hAlign = "center",
  size = 16,
  depth = 1,
  color = "#000000",
  height,
  curveSegments,
  bevelEnabled,
  bevelSize,
  bevelThickness,
  bevelOffset,
  bevelSegments,
  font,
  ...props
}) => {
  const adjustedSize = size / FONT_SIZE_SCALE;

  const config: TextGeometryParameters = useMemo(
    () => ({
      font,
      size: adjustedSize,
      height,
      curveSegments,
      bevelEnabled,
      bevelThickness,
      bevelSize,
      bevelOffset,
      bevelSegments,
    }),
    [font, size]
  );
  const mesh = useRef<THREE.Mesh>(null);
  useLayoutEffect(() => {
    if (mesh.current) {
      const boundingBoxSize = new THREE.Vector3();
      mesh.current.geometry.computeBoundingBox()
      mesh.current.geometry?.boundingBox?.getSize(boundingBoxSize)
      mesh.current.position.x =
        hAlign === "center" ? -boundingBoxSize.x / 2 : hAlign === "right" ? 0 : -boundingBoxSize.x;
      mesh.current.position.y =
        vAlign === "center" ? -boundingBoxSize.y / 2 : vAlign === "top" ? 0 : -boundingBoxSize.y;
      
      // center depth-wise automatically
      mesh.current.position.z = -boundingBoxSize.z / 2;
    }
  }, [children]);
  return (
    <group {...props} scale={[adjustedSize, adjustedSize, depth / FONT_DEPTH_SCALE]}>
      <mesh ref={mesh}>
        <textGeometry args={[children, config]} />
        <meshNormalMaterial color={color} />
      </mesh>
    </group>
  );
};

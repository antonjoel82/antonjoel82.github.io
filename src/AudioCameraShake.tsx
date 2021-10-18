import { CameraShake, CameraShakeProps } from "@react-three/drei";
import React from "react";

const cameraShakeConfig: CameraShakeProps = {
  maxYaw: 0, // Max amount camera can yaw in either direction
  maxPitch: 0.1, // Max amount camera can pitch in either direction
  maxRoll: 0, // Max amount camera can roll in either direction
  // yawFrequency: 1, // Frequency of the the yaw rotation
  pitchFrequency: 1, // Frequency of the pitch rotation
  // rollFrequency: 1, // Frequency of the roll rotation
  intensity: 1, // initial intensity of the shake
  decay: true, // should the intensity decay over time
  decayRate: 0.65, // if decay = true this is the rate at which intensity will reduce at
  additive: true, // this should be used when your scene has orbit controls
};

export const AudioCameraShake: React.FC = () => {
  return (
    <CameraShake {...cameraShakeConfig} />
  );
}

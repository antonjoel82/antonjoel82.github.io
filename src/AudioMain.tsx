import { Environment } from "@react-three/drei";
import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { DiscoBall } from "./DiscoBall";
import { MyPositionalAudio } from "./MyPositionalAudio";
import { Text3D } from "./Text3D";
import typefaceData from "@compai/font-oleo-script/data/typefaces/oleo-script-normal-400.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { useVisualizer } from "./useVisualizer";

const font = new FontLoader().parse(typefaceData)

export const AudioMain: React.FC = () => {
  const { song, handleSongEnded, } = useVisualizer();

  return (
    <>
      <MyPositionalAudio
        url={"./ColoursAndLights.mp3"}
        distance={10}
        loop={false}
        ref={song}
        autoplay={false}
        onEnded={handleSongEnded}
      />
      <DiscoBall position={[0, 0, -10]} minRadius={0.015} scale={1} />
      <Environment
        // files={"HankPainting.hdr"}
        preset="night"
        background
      />
      <Text3D hAlign="center" position={[-0.1, -2, 0]} font={font}>
        Classy
      </Text3D>
    </>
  );
};

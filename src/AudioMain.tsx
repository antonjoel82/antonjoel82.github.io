import { Environment } from "@react-three/drei";
import React, { MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { DiscoBall } from "./DiscoBall";
import { MyPositionalAudio } from "./MyPositionalAudio";
import { Text3D } from "./Text3D";
import typefaceData from "@compai/font-oleo-script/data/typefaces/oleo-script-normal-400.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { useVisualizer } from "./useVisualizer";

const font = new FontLoader().parse(typefaceData)

interface AudioMainProps {
  // sound: MutableRefObject<THREE.PositionalAudio | null>;
  // songUrl: string;
  // handleSongEnded: () => void;
}

export const AudioMain: React.FC<AudioMainProps> = () => {
  // const { analyzerRef, frequencyData } = useVisualizer({ sound });
  const { song, handleSongEnded, } = useVisualizer();
  const minBass = useRef<number>(255);


  // const [discoSize, setDiscoSize] = useState<number>(0.015);

  // useEffect(() => {
  //   console.log("Freq", frequencyData)
  //   const avgBass = mean(frequencyData.slice(0, 8));
  //   const bassScalar = Math.max(avgBass - minBass.current, 0);
  //   console.log(bassScalar);
  //   setDiscoSize(bassScalar);
    
  //   minBass.current = avgBass < minBass.current && avgBass > 0 ? avgBass : minBass.current;
  // }, [frequencyData[0]]);

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

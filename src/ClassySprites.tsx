import React from "react";
import { Sprites } from "./Sprites";

export interface ClassySpritesProps {
  numInstances: number;
}

export const ClassySprites: React.FC<ClassySpritesProps> = ({ numInstances }) => (
  <>
    <Sprites imgUrl={"./shawty.png"} numInstances={numInstances} />
    <Sprites imgUrl={"./nola.png"} numInstances={numInstances} />
    <Sprites imgUrl={"./sparks.png"} numInstances={numInstances} />
    <Sprites imgUrl={"./disc.png"} numInstances={numInstances} />
    <Sprites imgUrl={"./cone.png"} numInstances={numInstances} />
    <Sprites imgUrl={"./cleat.png"} numInstances={numInstances} />
    <Sprites imgUrl={"./dollar_sign.png"} numInstances={numInstances} />
  </>
);
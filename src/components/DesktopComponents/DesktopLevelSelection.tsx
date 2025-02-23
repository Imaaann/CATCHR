/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key } from "react";
import LevelCard from "../LevelCard";
import TitleTriangle from "../svg/TitleTriangle";
import DesktopComponent from "./DesktopComponent";
import { levelData } from "@/types/levelData";

function LevelSelectTriangle() {
  return (
    <div className="relative flex justify-center items-center w-[670px] h-[200px]">
      <div className="absolute inset-0 flex justify-center items-center">
        <TitleTriangle size={200} />
      </div>
      <div className="flex items-center gap-4 text-center mb-10 ml-10">
        <span className="font-extralight text-5xl font-hoover text-white">Level Select</span>
      </div>
    </div>
  );
}

function DesktopLevelSelection({ levels }: { levels: levelData[] }) {
  return (
    <DesktopComponent>
      <div className="ml-8 relative">
        <LevelSelectTriangle />
        <div className="flex flex-wrap gap-6 mt-16 p-6">
          {levels.map((level: any, index: Key) => {
            return <LevelCard level={level} key={index} />;
          })}
        </div>
      </div>
    </DesktopComponent>
  );
}

export default DesktopLevelSelection;

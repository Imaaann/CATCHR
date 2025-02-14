/* eslint-disable @typescript-eslint/no-explicit-any */
import { Key } from "react";
import LevelCard from "../LevelCard";
import MobileComponent from "./MobileComponent";
import MobileHeader from "./MobileHeader";
import { levelData } from "@/types/levelData";

function MobileLevelSelection({ levels }: { levels: levelData[] }) {
  return (
    <MobileComponent>
      <MobileHeader />
      <div className="ml-4 flex flex-col items-center w-full">
        <h1 className="text-white font-hoover text-3xl my-12">Level Select</h1>

        <div className="flex flex-wrap gap-6 p-3">
          {levels.map((level: any, index: Key) => {
            return <LevelCard level={level} key={index} />;
          })}
        </div>
      </div>
    </MobileComponent>
  );
}

export default MobileLevelSelection;

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import DifficultyCard from "./DifficultyCard";

export type levelData = {
  id: number;
  title: string;
  image_url: string;
  level_file_url: string;
  difficulty: string;
};

function LevelCard({ level }: { level: any }) {
  return (
    <div className="w-72 h-72 bg-white bg-opacity-[1%] flex flex-col shadow-faint-Glow text-white font-hoover p-3 gap-3 rounded-lg">
      <span className="text-2xl ">{level.title}</span>
      <Image
        height={100}
        width={100}
        src={level.image_url}
        alt={`Image of the CATCHR level ${level.image_url}`}
        className="self-center h-32 w-32 rounded-md shadow-white-Glow"
      />
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col gap-2">
          <span>High</span>
          <span>0000000</span>
        </div>
        <DifficultyCard text={level.difficulty} />
      </div>
    </div>
  );
}

export default LevelCard;

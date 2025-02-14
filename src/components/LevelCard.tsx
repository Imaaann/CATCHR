import Image from "next/image";
import DifficultyCard from "./DifficultyCard";
import Link from "next/link";
import type { levelData } from "@/types/levelData";

function LevelCard({ level }: { level: levelData }) {
  return (
    <div className="w-72 h-72 bg-white bg-opacity-[1%] flex flex-col shadow-faint-Glow text-white font-hoover p-3 gap-3 rounded-lg">
      <span className="text-2xl ">{level.title}</span>
      <Image
        height={100}
        width={100}
        src={level.image_url}
        alt={`Image of the CATCHR level ${level.title}`}
        className="self-center h-32 w-32 rounded-md shadow-white-Glow"
      />
      <div className="flex justify-between items-center mb-3">
        <div className="flex flex-col gap-2">
          <span>High</span>
          <span>{localStorage.getItem(level.id) || "0000000"}</span>
        </div>
        <Link href={`/game?uuid=${encodeURIComponent(level.id)}`}>
          <DifficultyCard text={level.difficulty} />
        </Link>
      </div>
    </div>
  );
}

export default LevelCard;

import Image from "next/image";
import DifficultyCard from "./DifficultyCard";

export type levelData = {
  id: number;
  title: string;
  imageSrc: string;
  difficulty: string;
  data: string;
};

function LevelCard({ id }: { id: number }) {
  // Dummy Data
  const levelData: levelData[] = [
    {
      id: 100,
      title: "Test1",
      imageSrc:
        "https://cdn.discordapp.com/attachments/586589326813429800/1335922780926906388/20250203_183918.jpg?ex=67a3e8cb&is=67a2974b&hm=228ee944470a913c84966ee9c61137f8e9a006ed61f6c74c1b8d8069b2948ea6&",
      difficulty: "Extreme 13",
      data: "{}",
    },
  ];

  // Get level based on id
  const level: levelData = levelData.find((lvl) => lvl.id === id) || levelData[0];

  return (
    <div className="w-72 h-72 bg-white bg-opacity-[1%] flex flex-col shadow-faint-Glow text-white font-hoover p-3 gap-3 rounded-lg">
      <span className="text-2xl">{level.title}</span>
      <Image
        height={100}
        width={100}
        src={level.imageSrc}
        alt={`Image of the CATCHR level ${level.title}`}
        className="self-center"
      />
      <div className="flex justify-between">
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

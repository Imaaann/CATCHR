import Image from "next/image";

function NowPlaying({
  imageSrc,
  title,
  difficulty,
}: {
  imageSrc: string;
  title: string;
  difficulty: string;
}) {
  return (
    <div className="absolute right-3 top-3 flex items-center gap-3 justify-between text-xs max-w-40 font-extralight shadow-faint-Glow rounded-md p-2 bg-white bg-opacity-5 z-10">
      <div className="flex flex-col gap-2">
        <span>
          Now Playing: <span className="font-light">{title}</span>
        </span>
        <span className="font-light">{difficulty}</span>
      </div>
      <Image
        height={35}
        width={35}
        src={imageSrc}
        alt={`Now Playing: ${title}`}
        className="rounded-full"
      />
    </div>
  );
}

export default NowPlaying;

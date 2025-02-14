import Image from "next/image";

export enum beatTypes {
  normal = "Normal",
  slider = "Slider",
  mine = "Mine",
  reverse = "Reverse",
  double = "Double",
  return = "Return",
}

function BeatCard({ type }: { type: beatTypes }) {
  const showCaseMap = {
    Normal: "/sprites/HitCircle.png",
    Slider: "/sprites/Slider.png",
    Mine: "/sprites/Mine.png",
    Reverse: "/sprites/Reverse.png",
    Double: "/sprites/Extra.png",
    Return: "/sprites/Return.png",
  };

  const showCaseTitle = {
    Normal: "Catch it, Quickly!",
    Slider: "Follow the dots, or else...",
    Mine: "You can try catching this one",
    Reverse: "You cant escape me, ill reverse your inputs",
    Double: "Would you like a helping hand",
    Return: "This got way out of hand... let's go back",
  };

  return (
    <div
      title={showCaseTitle[type]}
      className="min-h-40 min-w-40 flex flex-col justify-center items-center p-2 bg-[#171717] bg-opacity-5 rounded-md shadow-faint-Glow gap-4"
    >
      <span className="self-start text-2xl">{type}</span>
      <div className="flex justify-center items-center">
        <Image width={64} height={64} src={showCaseMap[type]} alt={showCaseTitle[type]} />
      </div>
    </div>
  );
}

export default BeatCard;

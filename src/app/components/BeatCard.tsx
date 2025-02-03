import hitCircle from "./svg/hitCircle";
import hitMine from "./svg/hitMine";
import hitReverse from "./svg/hitReverse";
import hitDouble from "./svg/hitDouble";

export enum beatTypes {
  normal = "Normal",
  slider = "Slider",
  mine = "Mine",
  reverse = "Reverse",
  double = "Double",
}

function sliderShow() {
  return (
    <svg width="80" height="80" viewBox="0 0 79 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 58.5C30 59.3284 29.3284 60 28.5 60C27.6716 60 27 59.3284 27 58.5C27 57.6716 27.6716 57 28.5 57C29.3284 57 30 57.6716 30 58.5Z"
        fill="white"
      />
      <path
        d="M36 50.5C36 51.3284 35.3284 52 34.5 52C33.6716 52 33 51.3284 33 50.5C33 49.6716 33.6716 49 34.5 49C35.3284 49 36 49.6716 36 50.5Z"
        fill="white"
      />
      <path
        d="M48 37.5C48 38.3284 47.3284 39 46.5 39C45.6716 39 45 38.3284 45 37.5C45 36.6716 45.6716 36 46.5 36C47.3284 36 48 36.6716 48 37.5Z"
        fill="white"
      />
      <path
        d="M53 31.5C53 32.3284 52.3284 33 51.5 33C50.6716 33 50 32.3284 50 31.5C50 30.6716 50.6716 30 51.5 30C52.3284 30 53 30.6716 53 31.5Z"
        fill="white"
      />
      <path
        d="M15.7286 68.6464L15.375 68.2929L15.0214 68.6464L10.6464 73.0214L10.2929 73.375L10.6464 73.7286L15.0214 78.1036L15.375 78.4571L15.7286 78.1036L20.1036 73.7286L20.4571 73.375L20.1036 73.0214L15.7286 68.6464ZM64.7286 10.6464L64.375 10.2929L64.0214 10.6464L59.6464 15.0214L59.2929 15.375L59.6464 15.7286L64.0214 20.1036L64.375 20.4571L64.7286 20.1036L69.1036 15.7286L69.4571 15.375L69.1036 15.0214L64.7286 10.6464ZM11.7071 73.375L15.375 69.7071L19.0429 73.375L15.375 77.0429L11.7071 73.375ZM60.7071 15.375L64.375 11.7071L68.0429 15.375L64.375 19.0429L60.7071 15.375ZM35.7071 44.375L39.375 40.7071L43.0429 44.375L39.375 48.0429L35.7071 44.375ZM78.5 15C78.5 23.0081 72.0081 29.5 64 29.5C55.9919 29.5 49.5 23.0081 49.5 15C49.5 6.99187 55.9919 0.5 64 0.5C72.0081 0.5 78.5 6.99187 78.5 15ZM29.5 73C29.5 81.0081 23.0081 87.5 15 87.5C6.99187 87.5 0.5 81.0081 0.5 73C0.5 64.9919 6.99187 58.5 15 58.5C23.0081 58.5 29.5 64.9919 29.5 73ZM29.5 58.5C29.5 59.0523 29.0523 59.5 28.5 59.5C27.9477 59.5 27.5 59.0523 27.5 58.5C27.5 57.9477 27.9477 57.5 28.5 57.5C29.0523 57.5 29.5 57.9477 29.5 58.5ZM35.5 50.5C35.5 51.0523 35.0523 51.5 34.5 51.5C33.9477 51.5 33.5 51.0523 33.5 50.5C33.5 49.9477 33.9477 49.5 34.5 49.5C35.0523 49.5 35.5 49.9477 35.5 50.5ZM47.5 37.5C47.5 38.0523 47.0523 38.5 46.5 38.5C45.9477 38.5 45.5 38.0523 45.5 37.5C45.5 36.9477 45.9477 36.5 46.5 36.5C47.0523 36.5 47.5 36.9477 47.5 37.5ZM52.5 31.5C52.5 32.0523 52.0523 32.5 51.5 32.5C50.9477 32.5 50.5 32.0523 50.5 31.5C50.5 30.9477 50.9477 30.5 51.5 30.5C52.0523 30.5 52.5 30.9477 52.5 31.5Z"
        stroke="white"
      />
    </svg>
  );
}

function BeatCard({ type, size = "base" }: { type: beatTypes; size?: string }) {
  const showCaseMap = {
    Normal: hitCircle({ size: 95 }),
    Slider: sliderShow(),
    Mine: hitMine(),
    Reverse: hitReverse(),
    Double: hitDouble(),
  };

  const showCaseTitle = {
    Normal: "Catch it, Quickly!",
    Slider: "Follow the dots, or else...",
    Mine: "You can try catching this one",
    Reverse: "You cant escape me, ill reverse your inputs",
    Double: "Would you like a helping hand",
  };

  return (
    <div
      title={showCaseTitle[type]}
      className="min-h-40 min-w-40 flex flex-col justify-center items-center p-2 bg-[#171717] bg-opacity-5 rounded-md shadow-faint-Glow gap-4"
    >
      <span className={"self-start" + " text-" + size}>{type}</span>
      <div>{showCaseMap[type]}</div>
    </div>
  );
}

export default BeatCard;

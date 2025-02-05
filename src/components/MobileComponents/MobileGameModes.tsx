import BeatCard from "../BeatCard";
import { beatTypes } from "../BeatCard";

function MobileGameModes() {
  return (
    <div className="font-hoover text-white ml-3 mt-4">
      <h2 className="text-3xl">Hit Circles</h2>
      <div className="flex flex-wrap gap-2">
        <BeatCard type={beatTypes.normal} />
        <BeatCard type={beatTypes.slider} />
        <BeatCard type={beatTypes.mine} />
        <BeatCard type={beatTypes.reverse} />
        <BeatCard type={beatTypes.double} />
      </div>
    </div>
  );
}

export default MobileGameModes;

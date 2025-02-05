import LevelCard from "../LevelCard";
import MobileComponent from "./MobileComponent";
import MobileHeader from "./MobileHeader";

function MobileLevelSelection({ levelIds }: { levelIds: number[] }) {
  return (
    <MobileComponent>
      <MobileHeader />
      <div className="ml-4 flex flex-col items-center w-full">
        <h1 className="text-white font-hoover text-3xl my-12">Level Select</h1>

        <div className="flex flex-wrap gap-6 p-3">
          {levelIds.map((id, index) => {
            return <LevelCard id={id} key={index} />;
          })}
        </div>
      </div>
    </MobileComponent>
  );
}

export default MobileLevelSelection;

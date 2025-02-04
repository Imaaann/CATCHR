import LevelCard from "../LevelCard";
import MobileComponent from "./MobileComponent";
import MobileHeader from "./MobileHeader";

function MobileLevelSelection() {
  // Fetch all Level Ids
  const levelIds: number[] = [100, 100, 100, 100, 100, 100, 100, 100];

  return (
    <MobileComponent>
      <MobileHeader />
      <div className="ml-4">
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

import DesktopLevelSelection from "../components/DesktopComponents/DesktopLevelSelection";
import MobileLevelSelection from "../components/MobileComponents/MobileLevelSelection";

function Home() {
  const ids: number[] = [100, 100, 100, 100, 100, 100, 100];

  return (
    <div className="overflow-auto scrollbar-none">
      <MobileLevelSelection levelIds={ids} />
      <DesktopLevelSelection levelIds={ids} />
    </div>
  );
}

export default Home;

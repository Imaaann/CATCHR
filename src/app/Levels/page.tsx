import DesktopLevelSelection from "../components/DesktopComponents/DesktopLevelSelection";
import MobileLevelSelection from "../components/MobileComponents/MobileLevelSelection";

function Home() {
  return (
    <div className="overflow-auto scrollbar-none">
      <MobileLevelSelection />
      <DesktopLevelSelection />
    </div>
  );
}

export default Home;

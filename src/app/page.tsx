import DesktopLanding from "../components/DesktopComponents/DesktopLanding";
import MobileLanding from "../components/MobileComponents/MobileLanding";

export default function Home() {
  return (
    <div className="overflow-auto scrollbar-none">
      <MobileLanding />
      <DesktopLanding />
    </div>
  );
}

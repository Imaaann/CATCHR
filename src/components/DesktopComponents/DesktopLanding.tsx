import PrimaryLogo from "../PrimaryLogo";
import DesktopAbout from "./DesktopAbout";
import DesktopComponent from "./DesktopComponent";
import DesktopHero from "./DesktopHero";
function DesktopLanding() {
  return (
    <DesktopComponent>
      <div className="relative w-screen max-h-screen min-h-screen">
        <div>
          <DesktopHero />
          <div className="absolute inline right-4 bottom-2">
            <PrimaryLogo size={120} />
          </div>
        </div>
        <DesktopAbout />
      </div>
    </DesktopComponent>
  );
}

export default DesktopLanding;

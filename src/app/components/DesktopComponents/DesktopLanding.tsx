import PrimaryLogo from "../PrimaryLogo";
import SquaresBottom from "../svg/SquaresBottom";
import SquaresTop from "../svg/SquaresTop";
import DesktopComponent from "./DesktopComponent";
import DesktopHero from "./DesktopHero";
function DesktopLanding() {
  return (
    <DesktopComponent>
      <div className="relative w-screen max-h-screen min-h-screen">
        <div>
          <DesktopHero />
        </div>
        <div className="max-h-fit max-w-fit absolute right-0 top-0 inline -z-10 overflow-hidden">
          <SquaresTop />
        </div>
        <div className="max-h-fit max-w-fit absolute right-0 inline bottom-0 -z-10 overflow-hidden pointer-events-none">
          <SquaresBottom />
        </div>
        <div className="absolute inline right-4 bottom-2">
          <PrimaryLogo size={170} />
        </div>
      </div>
    </DesktopComponent>
  );
}

export default DesktopLanding;

import MobileAbout from "./MobileAbout";
import MobileComponent from "./MobileComponent";
import MobileGameModes from "./MobileGameModes";
import MobileHeader from "./MobileHeader";
import MobileHero from "./MobileHero";

function MobileLanding() {
  return (
    <MobileComponent>
      <MobileHeader />
      <MobileHero />
      <MobileAbout />
      <MobileGameModes />
    </MobileComponent>
  );
}

export default MobileLanding;

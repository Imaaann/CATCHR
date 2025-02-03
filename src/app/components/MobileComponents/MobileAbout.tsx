import Image from "next/image";
import GameplayPlaceHolder from "../../../../public/images/Gameplay-Placeholder.png";

function MobileAbout() {
  return (
    <div className="font-hoover text-white text-3xl font-light mt-4">
      <h2 className="m-3">
        About <span className="font-normal">CATCHR</span>
      </h2>
      <div className="ml-3 mt-2 flex space-x-2">
        <Image
          src={GameplayPlaceHolder}
          height={175}
          width={175}
          alt="Video of a player playing the CATCHR game"
          className="rounded-md"
        />
        <p className="font-extralight text-base text-[#BFBFBF]">
          <span className="font-normal">CATCHR</span> is a web-based rhythm game where you catch the
          falling beats
          <br />
          <br />
          <span className="font-normal text-base"> Made by: iMan</span>
        </p>
      </div>
    </div>
  );
}

export default MobileAbout;

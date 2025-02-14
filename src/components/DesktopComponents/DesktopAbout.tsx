import PrimaryLogo from "../PrimaryLogo";
import TitleTriangle from "../svg/TitleTriangle";
import Image from "next/image";
import GameplayPlaceHolder from "@/../public/images/Gameplay-Placeholder.png";
import BeatCard from "../BeatCard";
import { beatTypes } from "../BeatCard";

function AboutTitle() {
  return (
    <div className="relative flex justify-center items-center w-[670px] h-[200px]">
      <div className="absolute inset-0 flex justify-center items-center">
        <TitleTriangle size={200} />
      </div>
      <div className="flex items-center gap-4 text-center mb-10">
        <span className="font-extralight text-5xl font-hoover text-white">About</span>
        <PrimaryLogo size={60} />
      </div>
    </div>
  );
}

function DesktopAbout() {
  return (
    <div className="relative ml-8 mt-24" id="About">
      <AboutTitle />
      <div className="flex justify-between font-hoover">
        <p className="font-extralight text-[#BFBFBF] text-3xl flex flex-col gap-8">
          <span>
            <span className="font-normal text-white ">CATCHR</span> is a web-based
            <br /> rhythm game where you
            <br /> catch the falling beats
          </span>
          <span className="font-light"> Made by: iMan</span>
        </p>
        <Image
          src={GameplayPlaceHolder}
          height={300}
          width={300}
          alt="Video of a player playing the CATCHR game"
          className="rounded-md mr-10"
        />
      </div>
      <div className="-mt-16 py-3">
        <span className="text-5xl text-white font-normal font-hoover">Hit Circles</span>
        <div className="flex flex-wrap gap-2 mt-4 font-hoover text-white mb-3">
          <BeatCard type={beatTypes.normal} />
          <BeatCard type={beatTypes.slider} />
          <BeatCard type={beatTypes.mine} />
          <BeatCard type={beatTypes.reverse} />
          <BeatCard type={beatTypes.double} />
          <BeatCard type={beatTypes.return} />
        </div>
      </div>
    </div>
  );
}

export default DesktopAbout;

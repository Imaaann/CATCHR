import Link from "next/link";
import Image from "next/image";
import github_pfp from "@/../public/images/Github-Pfp.png";
import HeroTriangle from "../svg/HeroTriangle";

function DesktopHero() {
  return (
    <div className="relative pointer-events-auto ">
      <div className="flex justify-between items-center px-5 font-hoover text-white text-md min-w-64 absolute right-0 top-4">
        <Link href="https://github.com/Imaaann/CATCHR" className="p-1">
          Github
        </Link>
        <Link href="#About" className="p-1">
          About
        </Link>
        <Link href="https://github.com/Imaaann">
          <Image
            src={github_pfp}
            height={50}
            width={50}
            alt="The game creator profile"
            className="circle rounded-full cursor-pointer"
          />
        </Link>
      </div>
      <div className="max-w-fit relative top-3 left-6">
        <div className="z-10 text-white text-5xl font-extralight font-hoover absolute top-52 left-32 flex flex-col gap-4">
          <p>
            Feel the
            <br />
            Rhythm,<span className="font-normal">Catch</span>
            <br />
            the Flow!
          </p>
          <Link href="/Levels">
            <button className="bg-white bg-opacity-5 hover:bg-opacity-10 shadow-white-Glow px-12 border-solid border-white border-opacity-10  rounded-md border text-3xl mt-8 text-left max-w-fit">
              GO
            </button>
          </Link>
        </div>
        <HeroTriangle />
      </div>
    </div>
  );
}

export default DesktopHero;

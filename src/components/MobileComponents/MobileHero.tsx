import Link from "next/link";
import CATCHRio from "../CATCHRio";

function MobileHero() {
  return (
    <div className="font-hoover text-white p-10 shadow-white-Glow relative overflow-hidden">
      <p className="text-[40px] max-w-72 font-extralight">
        Feel the
        <br /> Rhythm, <span className="font-normal">Catch</span>
        <br />
        the Flow!
      </p>
      <Link href="/Levels">
        <button className="bg-white bg-opacity-5 hover:bg-opacity-10 shadow-white-Glow px-6 border-solid border-white border-opacity-10  rounded-md border text-3xl mt-3">
          GO
        </button>
      </Link>
      <div className="absolute rotate-[-35deg] bottom-[-1] right-6 overflow-hidden">
        <CATCHRio size={150} />
      </div>
    </div>
  );
}

export default MobileHero;

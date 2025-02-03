import Link from "next/link";
import Image from "next/image";
import PrimaryLogo from "../PrimaryLogo";
import github_pfp from "../../../../public/images/Github-Pfp.png";

function MobileHeader() {
  return (
    <div className="flex justify-between bg-white bg-opacity-5 shadow-white-Glow">
      <div className="m-3">
        <PrimaryLogo size={24} />
      </div>
      <div className="flex justify-between items-center px-3 font-hoover text-white text-xs min-w-36">
        <Link href="https://github.com/Imaaann/CATCHR" className="p-1">
          Github
        </Link>
        <Image
          src={github_pfp}
          height={30}
          width={30}
          alt="The game creator profile"
          className="circle rounded-full"
        />
      </div>
    </div>
  );
}

export default MobileHeader;

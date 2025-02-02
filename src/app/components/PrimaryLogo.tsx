function PrimaryLogo({ size }: { size: number }) {
  const ASPECT_RATIO = 2.7;

  return (
    <svg
      width={size * ASPECT_RATIO}
      height={size}
      viewBox="0 0 456 169"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.976 144L0 128.896V68.736L14.976 53.632H44.544L59.52 68.736V84.992H42.624V76.032L36.608 70.016H23.552L17.536 76.032V121.728L23.552 127.744H36.608L42.624 121.728V112.64H59.52V128.896L44.544 144H14.976Z"
        fill="white"
      />
      <path
        d="M105.298 70.016L98.13 100.608H116.05L108.882 70.016H105.298ZM97.874 127.744V144H66.386V127.744H74.322L89.17 70.016L94.418 53.632H122.706L140.754 127.744H148.818V144H116.434V127.744H122.322L119.762 116.864H94.418L91.858 127.744H97.874Z"
        fill="white"
      />
      <path
        d="M244.976 144L230 128.896V68.736L244.976 53.632H274.544L289.52 68.736V84.992H272.624V76.032L266.608 70.016H253.552L247.536 76.032V121.728L253.552 127.744H266.608L272.624 121.728V112.64H289.52V128.896L274.544 144H244.976Z"
        fill="white"
      />
      <path
        d="M330.434 127.744V144H299.842V127.744H306.37V70.016H299.842V53.632H330.434V70.016H323.906V90.496H351.81V70.016H345.282V53.632H375.874V70.016H369.346V127.744H375.874V144H345.282V127.744H351.81V106.752H323.906V127.744H330.434Z"
        fill="white"
      />
      <path
        d="M430.106 70.016H411.034V94.208H430.106L436.122 88.192V76.032L430.106 70.016ZM417.434 144H386.842V127.744H393.37V70.016H386.842V53.632H438.554L453.658 68.736V94.848L440.858 107.648L450.458 127.744H455.962V144H428.186V127.744H432.922L424.346 109.952H411.034V127.744H417.434V144Z"
        fill="white"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M183.268 127.744C193.71 127.744 202.174 136.209 202.174 146.65V148.372C202.174 159.765 192.831 169 181.438 169C170.045 169 160.702 159.765 160.702 148.372V146.65C160.702 136.209 169.167 127.744 179.608 127.744V112.5V70.016H159.678H151.746C147.373 70.016 144.316 65.6891 145.778 61.568L146.315 60.7051C149.053 56.3062 153.868 53.632 159.05 53.632H203.839C209.083 53.632 213.947 56.3706 216.666 60.8548L217.098 61.568C218.56 65.6891 215.503 70.016 211.13 70.016H203.198H183.268V112.5V127.744ZM171.588 133.5H174.588V144H171.588V133.5ZM190.588 133.5V144H187.588V133.5H190.588Z"
        fill="white"
      />
      <circle cx="157.588" cy="34.5" r="9" stroke="white" />
      <circle cx="176.588" cy="9.5" r="9" stroke="white" />
    </svg>
  );
}

export default PrimaryLogo;

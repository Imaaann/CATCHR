function HeroTriangle() {
  return (
    <svg
      width="623"
      height="670"
      viewBox="0 0 1012 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_3_37)">
        <path
          d="M45 24L957 376L237 1000L45 24Z"
          fill="white"
          fillOpacity="0.05"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_3_37"
          x="0"
          y="-22"
          width="1012"
          height="1076"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="5" dy="4" />
          <feGaussianBlur stdDeviation="25" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0.5 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_37" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_37" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}

export default HeroTriangle;

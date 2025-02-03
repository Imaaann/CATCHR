function TitleTriangle({ size }: { size: number }) {
  const ASPECT_RATIO = 3.35;

  return (
    <svg
      width={size * ASPECT_RATIO}
      height={size}
      viewBox="0 0 929 277"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_12_1464)">
        <path
          d="M873.091 46L572.94 222.181L38.2167 87.645L873.091 46Z"
          fill="white"
          fillOpacity="0.05"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_12_1464"
          x="-6.7833"
          y="0"
          width="934.874"
          height="276.181"
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
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_12_1464" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_12_1464"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default TitleTriangle;

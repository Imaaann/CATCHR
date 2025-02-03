function hitDouble() {
  return (
    <svg width="95" height="95" viewBox="0 0 94 94" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_63_4439)">
        <path
          d="M86.5 43C86.5 64.8152 68.8152 82.5 47 82.5C25.1848 82.5 7.5 64.8152 7.5 43C7.5 21.1848 25.1848 3.5 47 3.5C68.8152 3.5 86.5 21.1848 86.5 43ZM81.5 43C81.5 62.0538 66.0538 77.5 47 77.5C27.9462 77.5 12.5 62.0538 12.5 43C12.5 23.9462 27.9462 8.5 47 8.5C66.0538 8.5 81.5 23.9462 81.5 43ZM47 78.5C66.6061 78.5 82.5 62.6061 82.5 43C82.5 23.3939 66.6061 7.5 47 7.5C27.3939 7.5 11.5 23.3939 11.5 43C11.5 62.6061 27.3939 78.5 47 78.5Z"
          stroke="#FF10F0"
          shapeRendering="crispEdges"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_63_4439"
          x="0"
          y="0"
          width="94"
          height="94"
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
          <feMorphology
            radius="3"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_63_4439"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.857546 0 0 0 0 0.145278 0 0 0 1 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_63_4439" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_63_4439"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default hitDouble;

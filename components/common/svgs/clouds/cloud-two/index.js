import styles from './index.module.css'

const CloudTwoSVG = () => {
  return (
    <svg
      className={styles.svg}
      width="964"
      height="1852"
      viewBox="0 0 964 1852"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.1" filter="url(#cloud_two_filter)">
        <path
          d="M-164.734 410.122C-154.55 396.771 -138.018 389.867 -121.364 392.011L402.764 459.48C419.418 461.624 433.664 472.49 440.134 487.985L643.768 975.628C650.238 991.123 647.951 1008.89 637.767 1022.24L317.272 1442.42C307.089 1455.77 290.556 1462.67 273.902 1460.53L-250.226 1393.06C-266.88 1390.91 -281.126 1380.05 -287.596 1364.55L-491.229 876.91C-497.7 861.415 -495.412 843.646 -485.229 830.295L-164.734 410.122Z"
          fill="url(#cloud_two)"
        />
      </g>
      <defs>
        <filter
          id="cloud_two_filter"
          x="-811.157"
          y="0.792847"
          width="1774.85"
          height="1850.95"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur stdDeviation="100" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient
          id="cloud_two"
          x1="-148.277"
          y1="388.546"
          x2="300.815"
          y2="1463.99"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F87EF" />
          <stop offset="1" stopColor="#D614A8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default CloudTwoSVG

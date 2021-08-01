import styles from './index.module.css'

const CloudOneSVG = () => {
  return (
    <svg
      className={styles.svg}
      width="468"
      height="633"
      viewBox="0 0 468 633"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.1" filter="url(#cloud_one_filter)">
        <path
          d="M-16.689 46.5232C-6.50536 33.1722 10.0274 26.2684 26.6814 28.4122L206.875 51.6081C223.529 53.7519 237.774 64.6178 244.245 80.1125L314.253 247.763C320.723 263.257 318.436 281.027 308.252 294.378L198.067 438.832C187.884 452.183 171.351 459.087 154.697 456.943L-25.4964 433.747C-42.1505 431.603 -56.3957 420.737 -62.8661 405.243L-132.875 237.593C-139.345 222.098 -137.058 204.328 -126.874 190.977L-16.689 46.5232Z"
          fill="url(#cloud_one)"
        />
      </g>
      <defs>
        <filter
          id="cloud_one_filter"
          x="-285.99"
          y="-147.083"
          width="753.358"
          height="779.521"
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
          <feGaussianBlur stdDeviation="50" result="effect1_foregroundBlur" />
        </filter>
        <linearGradient
          id="cloud_one"
          x1="-0.231961"
          y1="24.9477"
          x2="181.61"
          y2="460.407"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1F87EF" />
          <stop offset="1" stopColor="#D614A8" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default CloudOneSVG

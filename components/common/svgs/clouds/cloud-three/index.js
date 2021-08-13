import styles from './index.module.css'
import PropTypes from 'prop-types'

const CloudThreeSVG = ({ opacity = '0.1', top = '0' }) => {
  return (
    <svg
      className={styles.svg}
      style={{
        top,
      }}
      width="968"
      height="1624"
      viewBox="0 0 968 1624"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacity} filter="url(#cloud_three_filter)">
        <path
          d="M574.85 379.288C585.034 365.937 601.567 359.033 618.221 361.177L1052.69 417.106C1069.35 419.249 1083.59 430.115 1090.06 445.61L1258.86 849.837C1265.33 865.332 1263.04 883.102 1252.86 896.453L987.19 1244.75C977.006 1258.1 960.473 1265.01 943.819 1262.86L509.348 1206.93C492.694 1204.79 478.449 1193.92 471.979 1178.43L303.178 774.202C296.708 758.707 298.995 740.938 309.179 727.587L574.85 379.288Z"
          fill="url(#cloud_three)"
        />
      </g>
      <defs>
        <filter
          id="cloud_three_filter"
          x="0.667484"
          y="0.126038"
          width="1560.7"
          height="1623.79"
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
          id="cloud_three"
          x1="211.129"
          y1="657.698"
          x2="1146.25"
          y2="315.273"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E70077" />
          <stop offset="0.973958" stopColor="#FC8F0C" />
        </linearGradient>
      </defs>
    </svg>
  )
}

CloudThreeSVG.propTypes = {
  opacity: PropTypes.string,
  top: PropTypes.string,
}

export default CloudThreeSVG

function LineH({ width = '100%', sides }) {
  return (
    <svg
      width={width}
      height="2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        ...sides,
      }}
      className="absolute z-5"
    >
      <path
        d="M-4 1L1444 1.00011"
        stroke="#FF838D"
        strokeOpacity="0.4"
        strokeDasharray="2 2"
      />
    </svg>
  )
}

export default LineH

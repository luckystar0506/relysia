import LineV from '../svgs/line-v'

const Container = ({ children }) => {
  return (
    <div className="container">
      <LineV sides={{ top: '0', left: '1.25rem' }} />
      {children}
      <LineV sides={{ top: '0', right: '1.25rem' }} />
    </div>
  )
}

export default Container

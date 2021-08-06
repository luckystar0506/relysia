import logo from '../../../assets/images/logo@2x.png'
import PropTypes from 'prop-types'

const Logo = ({ width = '124px' }) => {
  return (
    <div style={{ width }}>
      <img src={logo} alt="Relysia Logo" />
    </div>
  )
}

Logo.propTypes = {
  width: PropTypes.string,
}

export default Logo

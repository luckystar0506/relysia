import PropTypes from 'prop-types'
import styles from './index.module.css'

const Caption = ({ text }) => {
  return <span className={styles.base}>{text}</span>
}

Caption.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Caption

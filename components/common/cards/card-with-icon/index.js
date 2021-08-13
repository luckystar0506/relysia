import PropTypes from 'prop-types'
import styles from './index.module.css'

const CardWithIcon = ({ title, p, icon }) => {
  return (
    <div className={styles.base}>
      <img className={styles.icon} src={icon} alt={title} />
      <div>
        <h5 className={styles.title}> {title} </h5>
        <p className={styles.p}> {p} </p>
      </div>
    </div>
  )
}

CardWithIcon.propTypes = {
  title: PropTypes.string.isRequired,
  p: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default CardWithIcon

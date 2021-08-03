import PropTypes from 'prop-types'
import cn from 'classnames'
import styles from './index.module.css'

const Title = ({ children, heading, classNames, border }) => {
  const headingStyle = []
  let Component

  if (heading === 'h1') {
    Component = 'h1'
    headingStyle.push(styles.h1)
  }
  if (heading === 'h2') {
    Component = 'h2'
    headingStyle.push(styles.h2)
  }
  if (heading === 'h3') {
    Component = 'h3'
    headingStyle.push(styles.h3)
  }
  if (heading === 'h4') {
    Component = 'h4'
    headingStyle.push(styles.h4)
  }
  if (heading === 'h5') {
    Component = 'h5'
    headingStyle.push(styles.h5)
  }

  return (
    <Component className={cn(styles.base, headingStyle, classNames)}>
      {border && <span className={styles.border}></span>}
      {children}
    </Component>
  )
}

Title.propTypes = {
  heading: PropTypes.string.isRequired,
  classNames: PropTypes.string,
}

export default Title

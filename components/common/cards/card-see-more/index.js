import Button from '../../button'
import PropTypes from 'prop-types'
import styles from './index.module.css'

const CardSeeMore = ({ title, p, btnText }) => {
  return (
    <div className={styles.base}>
      <div>
        <h5 className={styles.title}> {title} </h5>
        <p className={styles.p}> {p} </p>
      </div>
      <div>
        <Button
          appearance="noBox"
          href="/docs"
          arrow="right"
          fill="red"
          className="font-bold items-end"
        >
          {btnText}
        </Button>
      </div>
    </div>
  )
}

CardSeeMore.propTypes = {
  title: PropTypes.string.isRequired,
  p: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
}

export default CardSeeMore

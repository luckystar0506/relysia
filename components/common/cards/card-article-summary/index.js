import PropTypes from 'prop-types'
import styles from './index.module.css'
import Link from 'next/link'
import ArrowRight from '../../svgs/arrow-right'
import cn from 'classnames'

const CardArticleSummary = ({ title, img, p, date, href }) => {
  return (
    <div className={styles.base}>
      <img className={styles.img} src={img} alt={title} />
      <div
        className={cn(styles.info, 'backdrop-filter backdrop-blur-cardBLur')}
      >
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.p}>{p}</p>
        <div className={styles.bottom}>
          <span className={styles.date}>{date}</span>
          <Link href={href}>
            <a className={styles.read}>
              <span>Read More</span>
              <ArrowRight />
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

CardArticleSummary.propTypes = {
  title: PropTypes.string.isRequired,
  p: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
}

CardArticleSummary.defaultProps = {
  href: '/',
}

export default CardArticleSummary

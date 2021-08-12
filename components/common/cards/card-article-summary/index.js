import PropTypes from 'prop-types'
import styles from './index.module.css'
import Link from 'next/link'
import cn from 'classnames'
import img from '../../../../assets/images/docs/articles/article-summary.png'

const CardArticleSummary = () => {
  return (
    <div className={styles.base}>
      <img className={styles.img} src={img} alt="" />
      <div className={styles.info}>
        <h4 className={styles.title}>
          What is API? Let’s Getting Started with the API!
        </h4>
        <p className={styles.p}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that....
        </p>
        <div className={styles.bottom}>
          <span className={styles.date}>May 20th 2020</span>
          <Link href="/">
            <a className={styles.read}>Read More</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardArticleSummary

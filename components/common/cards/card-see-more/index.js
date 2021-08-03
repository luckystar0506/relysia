import Button from '../../button'
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

export default CardSeeMore

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

export default CardWithIcon

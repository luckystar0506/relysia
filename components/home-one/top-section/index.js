import CloudOneSVG from '../../common/svgs/clouds/cloud-one'
import CloudTwoSVG from '../../common/svgs/clouds/cloud-two'
import MainGradient from '../../common/svgs/main-gradient'
import Hero from './hero'
import styles from './index.module.css'

const TopSection = () => {
  return (
    <div className={styles.base}>
      <MainGradient />
      <CloudOneSVG />
      <CloudTwoSVG />
      <Hero />
    </div>
  )
}

export default TopSection

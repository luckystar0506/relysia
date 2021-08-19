import PropTypes from 'prop-types'
import Button from '../../../components/common/button'
import Container from '../../../components/common/container'
import styles from './index.module.css'
import laptopImg from '../../../assets/images/home-page/hero/hero-laptop.png'
import laptopImgLines from '../../../assets/images/home-page/hero/laptop-lines.svg'
import cn from 'classnames'
import Dots from '../../../components/common/svgs/dots'
import Title from '../../../components/common/title'

function Hero({ goToPlatform }) {
  return (
    <section className={styles.hero}>
      <Container>
        <Dots sides={{ bottom: '44px', left: '64px' }} />
        <Dots sides={{ top: '90px', right: '-20px' }} />
        <Dots sides={{ top: '460px', right: '160px' }} />
        <div className="h-full">
          <div className={cn(styles.heroLeft)}>
            <Title heading="h1">Jump start your crypto portfolio</Title>
            <p className={styles.p}>
              Relysia is more than just a Bitcoin wallet, it is also a
              super-tool for developers and entrepreneurs.
            </p>
            <div className={styles.actions}>
              <Button appearance="primary">Bitcoin Wallet</Button>
              <Button appearance="secondary" href="/about">
                Developer Docs
              </Button>
            </div>
            <div>
              <Button
                arrow="down-bordered"
                appearance="noBox"
                className="underline"
                onClick={goToPlatform}
              >
                Discover More
              </Button>
            </div>
          </div>
          <div className={styles.heroRight}>
            <img className={styles.heroImg} src={laptopImg} alt="" />
            <img className={styles.heroImgLines} src={laptopImgLines} alt="" />
          </div>
        </div>
      </Container>
    </section>
  )
}

Hero.propTypes = {
  goToPlatform: PropTypes.func.isRequired,
}

export default Hero

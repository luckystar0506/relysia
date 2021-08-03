import styles from './index.module.css'
import Title from '../../common/title'
import Container from '../../common/container'
import {
  appMockup,
  appStoreImg,
  playStoreImg,
  mapImg,
} from '../../../assets/images/home-page/download-our-app'

const DownloadOurApp = () => {
  return (
    <section
      className={styles.base}
      style={{ backgroundImage: `url(${mapImg})` }}
    >
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <img
              className={styles.appImg}
              src={appMockup}
              alt="Download Our App"
            />
          </div>
          <div className={styles.right}>
            <div className={styles.content}>
              <Title heading="h1" border classNames="w-72">
                Download Our App
              </Title>
              <p className={styles.p}>
                We store the vast majority of the digital assets in secure
                offline storage. Stay on top of the markets with the Relysia app
                for Android or iOS.
              </p>
              <div>
                <a href="" rel="noopener noreferrer" target="_blank">
                  <img
                    className="mr-6"
                    src={appStoreImg}
                    alt="Download Our App"
                  />
                </a>
                <a href="" rel="noopener noreferrer" target="_blank">
                  <img src={playStoreImg} alt="Download Our App" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default DownloadOurApp

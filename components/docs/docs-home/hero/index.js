import Caption from '../../../common/caption'
import Container from '../../../common/container'
import Title from '../../../common/title'
import styles from './index.module.css'
import docsPost from '../../../../assets/images/docs/docs-post.svg'
import docsHero from '../../../../assets/images/docs/docs-hero.svg'
import Dots from '../../../common/svgs/dots'
import ScrollDown from '../../../common/svgs/scroll-down'

const DocsHero = () => {
  return (
    <section className={styles.base}>
      <Container classNames="flex gap-12 h-full">
        <Dots sides={{ bottom: '0', left: '42px' }} />
        <div className={styles.left}>
          <Caption text="The Complete Guide" />
          <Title classNames="my-4" heading="h1">
            Documentation
          </Title>
          <p className="text-par">
            Relysia helps businesses to process payments easily with Bitcoin
            Wallet. Explore complete our products and guides to use Relysia.
          </p>
          <div className={styles.imgLeftWrapper}>
            <img
              className={styles.imgLeft}
              src={docsPost}
              alt="Relysia Docs Post"
            />
          </div>
        </div>
        <div className={styles.right}>
          <img src={docsHero} alt="Relysia Docs" />
        </div>
        <ScrollDown
          sides={{ bottom: '20%', left: '50%', transform: 'translateX(-50%)' }}
        />
      </Container>
    </section>
  )
}

export default DocsHero

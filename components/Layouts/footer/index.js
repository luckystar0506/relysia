import Logo from '../../common/logo'
import Container from '../../common/container'
import {
  appStoreImg,
  playStoreImg,
} from '../../../assets/images/home-page/download-our-app'
import styles from './index.module.css'
import Link from 'next/link'
import Title from '../../common/title'
import SocialIcon from '../../common/svgs/social-icon'

const Footer = () => {
  return (
    <footer className={styles.base}>
      <Container classNames="flex py-14">
        <div className={styles.column}>
          <Logo />
          <div className={styles.icons}>
            <a
              href="https://www.relysia.com"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.icon}
            >
              <SocialIcon iconType="vk" />
            </a>
            <a
              href="https://www.relysia.com"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.icon}
            >
              <SocialIcon iconType="pinterest" />
            </a>
            <a
              href="https://www.relysia.com"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.icon}
            >
              <SocialIcon iconType="instagram" />
            </a>
            <a
              href="https://twitter.com/Relysia_SV"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.icon}
            >
              <SocialIcon iconType="twitter" />
            </a>
            <a
              href="https://www.relysia.com"
              rel="noopener noreferrer"
              target="_blank"
              className={styles.icon}
            >
              <SocialIcon iconType="facebook" />
            </a>
          </div>
          <div className="mb-7">
            <a
              href="https://www.relysia.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className="mr-6" src={appStoreImg} alt="Download Our App" />
            </a>
          </div>
          <div>
            <a
              href="https://www.relysia.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={playStoreImg} alt="Download Our App" />
            </a>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.links}>
            <Title
              heading="h4"
              style={{ letterSpacing: '-0.32px', marginBottom: '1.5rem' }}
            >
              PRODUCTS
            </Title>
            <ul>
              <li className={styles.linkItem}>
                <Link href="/features">
                  <a>Features</a>
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/">
                  <a>Personal License</a>
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/">
                  <a>Business License</a>
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/pricing">
                  <a>Pricing Options</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.links}>
            <Title
              heading="h4"
              style={{ letterSpacing: '-0.32px', marginBottom: '1.5rem' }}
            >
              COMPANY
            </Title>
            <ul>
              <li className={styles.linkItem}>
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/">
                  <a>Careers</a>
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/">
                  <a>Blog</a>
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/contact">
                  <a>Contact</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.links}>
            <Title
              heading="h4"
              style={{ letterSpacing: '-0.32px', marginBottom: '1.5rem' }}
            >
              SUPPORT
            </Title>
            <ul>
              <li className={styles.linkItem}>
                <Link href="/">
                  <a>Support Center</a>
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/">
                  <a>Help Desk</a>
                </Link>
              </li>
              <li className={styles.linkItem}>
                <Link href="/faq">
                  <a>FAQ</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <div className={styles.copyright} style={{ letterSpacing: '-0.32px' }}>
        Copyright © 2021 Vaionex Corporation | All rights reserved
      </div>
    </footer>
  )
}

export default Footer

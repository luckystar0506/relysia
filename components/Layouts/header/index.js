import Link from 'next/link'
import { useRouter } from 'next/router'
import ActiveLink from '../../common/active-link'
import Button from '../../common/button'
import Caption from '../../common/caption'
import Container from '../../common/container'
import Logo from '../../common/logo'
import styles from './index.module.css'

const Header = () => {
  const { pathname } = useRouter()

  return pathname === '/api-docs' ? (
    <header className={styles.headerApi}>
      <div className="flex item-center">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <Caption text="API" classNames="text-white ml-4" />
      </div>
      <nav className={styles.nav}>
        <ActiveLink href="/" activeClassName={styles.active}>
          <a className={styles.navItem}>Home</a>
        </ActiveLink>
        <ActiveLink href="/docs" activeClassName={styles.active}>
          <a className={styles.navItem}>Docs</a>
        </ActiveLink>
        <ActiveLink href="/docs/wallet" activeClassName={styles.active}>
          <a className={styles.navItem}>Wallet</a>
        </ActiveLink>
        <ActiveLink href="/demo" activeClassName={styles.active}>
          <a className={styles.navItem}>Demo</a>
        </ActiveLink>
      </nav>
      <div>
        <Link href="/auth/login">
          <a className="py-3 px-4 font-semibold hover:text-white">Sign In</a>
        </Link>
        <Button href="/auth/register" appearance="primary" small>
          Sign Up
        </Button>
      </div>
    </header>
  ) : (
    <header className={styles.header}>
      <Container classNames="flex justify-between items-center">
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <nav className={styles.nav}>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a className={styles.navItem}>Home</a>
          </ActiveLink>
          <ActiveLink href="/docs" activeClassName={styles.active}>
            <a className={styles.navItem}>Docs</a>
          </ActiveLink>
          <ActiveLink href="/docs/wallet" activeClassName={styles.active}>
            <a className={styles.navItem}>Wallet</a>
          </ActiveLink>
          <ActiveLink href="/demo" activeClassName={styles.active}>
            <a className={styles.navItem}>Demo</a>
          </ActiveLink>
        </nav>
        <div>
          <Link href="/auth/login">
            <a className="py-3 px-4 font-semibold hover:text-white">Sign In</a>
          </Link>
          <Button href="/auth/register" appearance="primary" small>
            Sign Up
          </Button>
        </div>
      </Container>
    </header>
  )
}

export default Header

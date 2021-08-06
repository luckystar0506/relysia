import Link from 'next/link'
import ActiveLink from '../../common/active-link'
import Button from '../../common/button'
import Container from '../../common/container'
import Logo from '../../common/logo'
import styles from './index.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <Container classNames="flex justify-between items-center">
        <Logo />
        <nav className={styles.nav}>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a className={styles.navItem}>Home</a>
          </ActiveLink>
          <ActiveLink href="/docs" activeClassName={styles.active}>
            <a className={styles.navItem}>Docs</a>
          </ActiveLink>
          <ActiveLink href="/wallet" activeClassName={styles.active}>
            <a className={styles.navItem}>Wallet</a>
          </ActiveLink>
          <ActiveLink href="/demo" activeClassName={styles.active}>
            <a className={styles.navItem}>Demo</a>
          </ActiveLink>
        </nav>
        <div>
          <Link href="/signin">
            <a className="py-3 px-4 font-semibold">Sign In</a>
          </Link>
          <Button href="/login" appearance="primary" small>
            Sign Up
          </Button>
        </div>
      </Container>
    </header>
  )
}

export default Header

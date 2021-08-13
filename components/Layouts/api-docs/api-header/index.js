import Button from '../../../common/button'
import Logo from '../../../common/logo'
import styles from './index.module.css'
import Link from 'next/link'
import Caption from '../../../common/caption'

const APIHeader = () => {
  return (
    <header className={styles.base}>
      <div className="flex item-center">
        <Logo />
        <Caption text="API" classNames="text-white ml-4" />
      </div>
      <div>
        <Link href="/docs">
          <a className="py-3 px-4 font-semibold">Docs</a>
        </Link>
        <Button href="/auth/login" appearance="primary" small>
          Sign Up
        </Button>
      </div>
    </header>
  )
}

export default APIHeader

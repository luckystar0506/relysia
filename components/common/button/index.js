import Link from 'next/link'
import cn from 'classnames'
import ArrowRight from '../../../assets/images/arrow-right.svg'
import ArrowDownBordered from '../../../assets/images/arrow-down-bordered.svg'

import styles from './index.module.css'

const Button = ({ children, className, appearance, arrow, href, ...props }) => {
  const btnClass = []

  if (appearance === 'primary') {
    btnClass.push(styles.primary)
  }

  if (appearance === 'secondary') {
    btnClass.push(styles.secondary)
  }

  if (appearance === 'fat') {
    btnClass.push(styles.fat)
  }

  if (appearance === 'noBox' && href) {
    return (
      <Link href={href} {...props}>
        <a className={cn(styles.base, styles.noBox, ...btnClass)}>
          <img className={'mr-2'} src={ArrowDownBordered} alt="" />
          {children}
        </a>
      </Link>
    )
  }

  if (href) {
    return (
      <Link href={href} {...props}>
        <a className={cn(styles.base, styles.link, ...btnClass)}>
          {children}
          {arrow === 'right' && (
            <img className={styles.btnIcon} src={ArrowRight} alt="" />
          )}
        </a>
      </Link>
    )
  }

  return (
    <button className={cn(styles.base, ...btnClass)} {...props}>
      {children}
    </button>
  )
}

export default Button

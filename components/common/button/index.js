import Link from 'next/link'
import cn from 'classnames'
import ArrowRight from '../svgs/arrow-right'
import ArrowDownBordered from '../../../assets/images/arrow-down-bordered.svg'

import styles from './index.module.css'

const Button = ({
  children,
  appearance,
  className,
  arrow,
  href,
  fill,
  ...props
}) => {
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

  if (appearance === 'noBox') {
    btnClass.push(styles.noBox)
  }

  if (href) {
    return (
      <Link href={href} {...props}>
        <a
          className={cn(
            styles.base,
            styles.link,
            ...btnClass,
            className,
            fill === 'red' && 'text-secondary hover:text-secondary',
          )}
        >
          {arrow === 'down-bordered' && (
            <img className={'mr-2'} src={ArrowDownBordered} alt="" />
          )}

          {children}

          {arrow === 'right' && (
            <span className="ml-2">
              <ArrowRight fill={fill} />
            </span>
          )}
        </a>
      </Link>
    )
  }

  return (
    <button className={cn(styles.base, ...btnClass, className)} {...props}>
      {children}
    </button>
  )
}

export default Button

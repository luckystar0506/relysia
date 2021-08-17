import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'
import PropTypes from 'prop-types'

const ActiveLink = ({ children, activeClassName, ...props }) => {
  const { asPath } = useRouter()
  const child = Children.only(children)

  console.log(props.activeClassName)

  const childClassName = child.props.className || ''

  const className =
    asPath === props.href || asPath === props.as
      ? `${childClassName} ${activeClassName}`.trim()
      : childClassName

  return (
    <Link {...props}>
      {React.cloneElement(child, { className: className || null })}
    </Link>
  )
}

ActiveLink.propTypes = {
  children: PropTypes.node.isRequired,
  router: PropTypes.object,
  ...{
    href: PropTypes.string.isRequired,
    activeClassName: PropTypes.string,
  },
}

export default ActiveLink

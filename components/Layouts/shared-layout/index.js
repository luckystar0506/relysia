import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Footer from '../footer'
import Header from '../header'
import { useRouter } from 'next/router'

const SharedLayout = ({ children }) => {
  const { route } = useRouter()
  const page = useRef()

  useEffect(() => {
    console.log(route)
    if (route === '/api-docs') {
      document.body.style.overflowX = 'initial'
      page.current.style.overflow = 'unset'
    } else {
      document.body.style.overflowX = 'hidden'
      page.current.style.overflow = 'hidden'
    }
  }, [route])

  return (
    <div ref={page} className="page">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

SharedLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SharedLayout

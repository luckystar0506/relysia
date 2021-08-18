import { useEffect, useRef } from 'react'
import APIDocs from '../../components/api-docs'

const APIPage = () => {
  const page = useRef()
  useEffect(() => {
    document.body.style.overflowX = 'initial'
    page.current.style.overflow = 'unset'
  }, [])
  return (
    <div ref={page} className="page">
      <APIDocs />
    </div>
  )
}

export default APIPage

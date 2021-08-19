import ApiSection from './api-section'
import GlobalScale from './global-scale'
import Hero from './hero'
import Platform from './platform'
import DownloadOurApp from '../Layouts/shared-sections/download-our-app'
import { useRef } from 'react'

const HomeMain = () => {
  const platformRef = useRef()

  const goToPlatform = () => {
    platformRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Hero goToPlatform={goToPlatform} />
      <Platform platformRef={platformRef} />
      <ApiSection />
      <GlobalScale />
      <DownloadOurApp />
    </>
  )
}

export default HomeMain

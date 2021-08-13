import ApiSection from './api-section'
import GlobalScale from './global-scale'
import Hero from './hero'
import Platform from './platform'
import DownloadOurApp from '../Layouts/shared-sections/download-our-app'

const HomeMain = () => {
  return (
    <>
      <Hero />
      <Platform />
      <ApiSection />
      <GlobalScale />
      <DownloadOurApp />
    </>
  )
}

export default HomeMain

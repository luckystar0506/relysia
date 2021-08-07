import {
  CloudOneSVG,
  CloudTwoSVG,
  CloudThreeSVG,
} from '../../components/common/svgs/clouds'

import MainGradient from '../../components/common/svgs/main-gradient'
import ApiSection from '../../components/home/api-section'
import DownloadOurApp from '../../components/home/download-our-app'
import GlobalScale from '../../components/home/global-scale'
import Hero from '../../components/home/hero'
import Platform from '../../components/home/platform'
import Header from '../../components/Layouts/header'
import Footer from '../../components/Layouts/footer'

const Home = () => {
  return (
    <div className="relative">
      <MainGradient />
      <CloudOneSVG />
      <CloudTwoSVG />
      <CloudThreeSVG top="30%" opacity="0.2" />
      <CloudThreeSVG top="65%" />
      <Header />
      <Hero />
      <Platform />
      <ApiSection />
      <GlobalScale />
      <DownloadOurApp />
      <Footer />
    </div>
  )
}

export default Home

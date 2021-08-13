import {
  CloudOneSVG,
  CloudTwoSVG,
  CloudThreeSVG,
} from '../../components/common/svgs/clouds'

import MainGradient from '../../components/common/svgs/main-gradient'
import Header from '../../components/Layouts/header'
import Footer from '../../components/Layouts/footer'
import HomeMain from '../../components/home'

const Home = () => {
  return (
    <div className="page">
      <MainGradient />
      <CloudOneSVG />
      <CloudTwoSVG />
      <CloudThreeSVG top="30%" opacity="0.2" />
      <CloudThreeSVG top="65%" />
      <Header />
      <HomeMain />
      <Footer />
    </div>
  )
}

export default Home

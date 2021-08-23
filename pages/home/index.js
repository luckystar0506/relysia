import {
  CloudOneSVG,
  CloudTwoSVG,
  CloudThreeSVG,
} from '../../components/common/svgs/clouds'

import MainGradient from '../../components/common/svgs/main-gradient'
import HomeMain from '../../components/home'

const Home = () => {
  return (
    <>
      <MainGradient />
      <CloudOneSVG />
      <CloudTwoSVG />
      <CloudThreeSVG top="30%" opacity="0.2" />
      <CloudThreeSVG top="65%" />
      <HomeMain />
    </>
  )
}

export default Home

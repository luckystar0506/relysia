import {
  CloudOneSVG,
  CloudTwoSVG,
  CloudThreeSVG,
} from "../../components/common/svgs/clouds";

import MainGradient from "../../components/common/svgs/main-gradient";
import ApiSection from "../../components/home/api-section";
import GlobalScale from "../../components/home/global-scale";
import Hero from "../../components/home/hero";
import Platform from "../../components/home/platform";

const HomeOne = () => {
  return (
    <div className="relative">
      <MainGradient />
      <CloudOneSVG />
      <CloudTwoSVG />
      <Hero />
      <Platform />
      <ApiSection />
      <GlobalScale />
    </div>
  );
};

export default HomeOne;

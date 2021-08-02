import {
  CloudOneSVG,
  CloudTwoSVG,
  CloudThreeSVG,
} from "../../components/common/svgs/clouds";

import MainGradient from "../../components/common/svgs/main-gradient";
import ApiSection from "../../components/home/api-section";
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
    </div>
  );
};

export default HomeOne;

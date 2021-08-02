import {
  CloudOneSVG,
  CloudThreeSVG,
  CloudTwoSVG,
} from "../../components/common/svgs/clouds";

import MainGradient from "../../components/common/svgs/main-gradient";
import Hero from "./hero";
import Platform from "./platform";

const HomeOne = () => {
  return (
    <div className="relative">
      <MainGradient />
      <CloudOneSVG />
      <CloudTwoSVG />
      <Hero />
      <Platform />
    </div>
  );
};

export default HomeOne;

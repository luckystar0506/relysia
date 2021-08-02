import Hero from "./hero";
import Platform from "./platform";

import CloudOneSVG from "../../common/svgs/clouds/cloud-one";
import CloudTwoSVG from "../../common/svgs/clouds/cloud-two";
import MainGradient from "../../common/svgs/main-gradient";
import styles from "./index.module.css";

const TopSection = () => {
  return (
    <div className={styles.base}>
      <MainGradient />
      <CloudOneSVG />
      <CloudTwoSVG />
      <Hero />
      <Platform />
    </div>
  );
};

export default TopSection;

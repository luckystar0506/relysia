import Image from "next/image";
import Container from "../../common/container";
import Title from "../../common/title";
import styles from "./index.module.css";
import apiCodeImgx2 from "../../../assets/images/home-page/api-section/api-code@2x.png";
import circleShapex2 from "../../../assets/images/home-page/api-section/circle-shape@2x.png";
import Button from "../../common/button";
import SeeMore from "../../common/cards/see-more";
import Dots from "../../common/svgs/dots";

const ApiSection = () => {
  return (
    <section className={styles.base}>
      <Container>
        <Dots sides={{ bottom: "-140px", left: "40px" }} />
        <Dots sides={{ bottom: "80px", right: "-160px" }} />
        <Title heading="h5">Designed for developers</Title>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <Title heading="h2">
              Powerful and <br /> easy-to-use <br /> APIs
            </Title>
            <p className={styles.p}>
              We agonize over the right abstractions so your teams don’t need to
              stitch together disparate systems or spend months integrating
              payments functionality.
            </p>
            <Button appearance="fat" href="/docs" arrow="right">
              Read the docs
            </Button>

            <div className="flex gap-20">
              <SeeMore
                title="Tools for every stack"
                p="We offer client and server libraries in everything from React and PHP to .NET and iOS."
                btnText="See libraries"
              />

              <SeeMore
                title="Prebuilt integrations
              "
                p="Use integrations for systems like Shopify, WooCommerce, NetSuite, and more."
                btnText="See libraries"
              />
            </div>
          </div>
          <div className={styles.right}>
            <span className={styles.img}>
              <Image
                src={apiCodeImgx2}
                alt="Api Code"
                width={504}
                height={612}
                layout="responsive"
              />
            </span>
            <span className={styles.circle}>
              <Image
                src={circleShapex2}
                alt=""
                width={347}
                height={361}
                layout="responsive"
              />
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ApiSection;

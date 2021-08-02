import Button from "../../../components/common/button";
import Container from "../../../components/common/container";
import styles from "./index.module.css";
import laptopImg from "../../../assets/images/home-page/hero/hero-laptop.png";
import laptopImgLines from "../../../assets/images/home-page/hero/laptop-lines.svg";
import cn from "classnames";
import Dots from "../../../components/common/svgs/dots";
import LineH from "../../../components/common/svgs/line-h";
import Title from "../../../components/common/title";

function Hero() {
  return (
    <section className={styles.hero}>
      <LineH sides={{ top: "49.7%", left: "0", right: "0" }} />
      <LineH sides={{ top: "55%", left: "0", right: "0" }} />
      <LineH sides={{ bottom: "0%", left: "0", right: "0" }} />
      <Container>
        <Dots sides={{ bottom: "44px", left: "64px" }} />
        <Dots sides={{ top: "90px", right: "-20px" }} />
        <Dots sides={{ top: "460px", right: "160px" }} />

        <div>
          <div className={cn(styles.heroLeft)}>
            <Title heading="h1">Jump start your crypto portfolio</Title>
            <p className={styles.p}>
              Relysia is more than just a Bitcoin wallet, it is also a
              super-tool for developers and entrepreneurs.
            </p>
            <div className={styles.actions}>
              <Button appearance="primary">Bitcoin Wallet</Button>
              <Button appearance="secondary" href="/about">
                Developer Docs
              </Button>
            </div>
            <div>
              <Button
                arrow="down-bordered"
                appearance="noBox"
                href="/about"
                flat
              >
                Discover More
              </Button>
            </div>
          </div>
          <div className={styles.heroRight}>
            <img className={styles.heroImg} src={laptopImg} alt="" />
            <img className={styles.heroImgLines} src={laptopImgLines} alt="" />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;

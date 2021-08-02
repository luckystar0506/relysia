import Container from "../../../components/common/container";
import Title from "../../../components/common/title";
import styles from "./index.module.css";
import {
  platform1svg,
  platform2svg,
  platform3svg,
} from "../../../assets/images/home-page/platform";
import LineH from "../../../components/common/svgs/line-h";
import Dots from "../../../components/common/svgs/dots";

const platformData = [
  {
    id: 1,
    title: "Fastest-improving platform",
    content:
      "We release hundreds of features and improvements each year to help you stay ahead of industry shifts. (On average, we deploy our production API 16x per day.)",
    image: platform1svg,
  },
  {
    id: 2,
    title: "Battle-tested reliability",
    content:
      "Our systems operate with 99.9%+ uptime and are highly scalable and redundant. Relysia is certified to the highest compliance standards.",
    image: platform2svg,
  },
  {
    id: 3,
    title: "Intelligent optimizations",
    content:
      "Our machine learning models train on billions of data points and help increase revenue across conversion, fraud, revenue recovery, and more.",
    image: platform3svg,
  },
];

const Platform = () => {
  return (
    <section className={styles.platform}>
      <LineH sides={{ top: "26px", left: "0", right: "0" }} />
      <LineH sides={{ bottom: 0, left: "0", right: "0" }} />
      <Container classNames="pb-52">
        <Dots sides={{ bottom: "22px", left: "-156px" }} />
        <Dots sides={{ bottom: "22px", left: "30%" }} />
        <Title heading="h5" classNames="text-center py-1">
          Hi-tech platform
        </Title>
        <Title
          heading="h2"
          classNames="text-center max-w-3xl m-auto mt-8 mb-20"
        >
          A technology-first approach to payments and finance
        </Title>
        <div className={styles.wrapper}>
          {platformData.map((card) => (
            <div className={styles.card} key={card.id}>
              <img className={styles.img} src={card.image} alt={card.title} />
              <div className={styles.title}>{card.title}</div>
              <p className={styles.p}>{card.content}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Platform;

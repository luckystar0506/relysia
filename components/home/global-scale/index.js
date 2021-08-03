import styles from "./index.module.css";
import WolrdMapBg from "../../../assets/images/home-page/global-scale/world-map-bg.png";
import Title from "../../common/title";
import Container from "../../common/container";
import CardWithIcon from "../../common/cards/card-with-icon";
import {
  CloudLightningSVG,
  MessageProgrammingSVG,
  SmsTrackingSVG,
  WalletCheckSVG,
} from "../../../assets/images/home-page/global-scale/index";

const data = [
  {
    id: 1,
    title: "Flexible invoicing",
    content:
      "Create customizable invoices to accept recurring or one-off payments.",
    icon: CloudLightningSVG,
  },
  {
    id: 2,
    title: "Third-party integrations",
    content:
      "Explore our partner directory for prebuilt integrations to popular platforms and plugins.",
    icon: MessageProgrammingSVG,
  },
  {
    id: 3,
    title: "Mobile apps",
    content:
      "Accept payments in your iOS or Android app using our mobile SDKs.",
    icon: WalletCheckSVG,
  },
  {
    id: 4,
    title: "Shareable links",
    content:
      "Create a full payment page in just a few clicks and share the link with your customers.",
    icon: SmsTrackingSVG,
  },
];

const GlobalScale = () => {
  return (
    <section
      className={styles.base}
      style={{
        backgroundImage: `url(${WolrdMapBg})`,
      }}
    >
      <Container classNames="h-auto">
        <div className={styles.content}>
          <Title heading="h5">global scale</Title>
          <Title heading="h2" classNames="mt-8 mb-14 w-[442px]">
            A complete Bitcoin Wallet platform, engineered for growth
          </Title>

          <div className={styles.cards}>
            {data.map((item) => (
              <CardWithIcon
                title={item.tite}
                icon={item.icon}
                key={item.id}
                p={item.content}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default GlobalScale;

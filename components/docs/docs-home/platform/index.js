import Container from '../../../common/container'
import graphsSVG from '../../../../assets/images/docs/graphs.svg'
import styles from './index.module.css'
import Title from '../../../common/title'
import CardPlatformGray from '../../../common/cards/card-platform-gray'
import {
  apiSVG,
  sdkSVG,
  faqSVG,
  walletSVG,
  demoSVG,
  transactionSVG,
} from '../../../../assets/images/docs/platform'

const data = [
  {
    id: 1,
    title: 'APIs',
    content: 'In Authentication, create user, auth, send otp, verify otp',
    icon: apiSVG,
    href: '/api-docs',
  },
  {
    id: 2,
    title: 'SDKs',
    content: 'In User, get user details, update user Details',
    icon: sdkSVG,
    href: '/',
  },
  {
    id: 3,
    title: 'Demo',
    content: 'In wallet, get user details, update user Details',
    icon: demoSVG,
    href: '/',
  },
  {
    id: 4,
    title: 'Transaction',
    content: 'In User, get user details, update user Details.',
    icon: transactionSVG,
    href: '/',
  },
  {
    id: 5,
    title: 'FAQs',
    content: 'In User, get user details, update user Details',
    icon: faqSVG,
    href: '/',
  },
  {
    id: 6,
    title: 'Wallet',
    content: 'In wallet, get user details, update user Details',
    icon: walletSVG,
    href: '/',
  },
]

const DocsPlatform = () => {
  return (
    <section className={styles.base}>
      <img src={graphsSVG} alt="Graph" className={styles.graphSVG} />
      <Container classNames="-mt-1/4">
        <Title heading="h5" classNames="text-center py-1">
          Hi-tech platform
        </Title>
        <Title
          heading="h2"
          classNames="text-center max-w-3xl m-auto mt-8 mb-20"
        >
          A technology-first approach to payments and finance
        </Title>
        <div className={styles.cards}>
          {data.map((card) => (
            <CardPlatformGray
              key={card.id}
              title={card.title}
              p={card.content}
              icon={card.icon}
              href={card.href}
              btnFill={card.id % 2 === 0 ? 'var(--relGreen)' : 'var(--relPink)'}
              shadow={
                card.id % 2 === 0
                  ? 'shadow-platformCardIconGreen'
                  : 'shadow-platformCardIconPink'
              }
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default DocsPlatform

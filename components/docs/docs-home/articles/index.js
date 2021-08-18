import PropTypes from 'prop-types'
import CardArticleSummary from '../../../common/cards/card-article-summary'
import Container from '../../../common/container'
import Title from '../../../common/title'
import styles from './index.module.css'
import gradientBg from '../../../../assets/images/docs/articles/gradient-bg.svg'

const DocsArticles = ({ stories }) => {
  return (
    <section
      className={styles.base}
      style={{
        backgroundImage: `url(${gradientBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center 180px',
        backgroundSize: 'cover',
      }}
    >
      <Container>
        <Title heading="h5" classNames="text-center">
          Articles
        </Title>
        <Title heading="h2" classNames="text-center mt-8">
          Top Help Articles
        </Title>
        <div className={styles.cards}>
          {stories.map((card) => (
            <CardArticleSummary
              key={card.id}
              title={card.content.content[0].title}
              p={card.content.content[0].intro_text}
              img={card.content.content[0].image.filename}
              href={'/article/' + card.slug}
              date={new Date(card.published_at).toLocaleDateString()}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

DocsArticles.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default DocsArticles

import React from 'react'
import CardArticleSummary from '../../../common/cards/card-article-summary'
import Container from '../../../common/container'
import Title from '../../../common/title'
import styles from './index.module.css'
import gradientBg from '../../../../assets/images/docs/articles/gradient-bg.svg'

const DocsArticles = () => {
  return (
    <section
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
          {/* cards are static now */}
          <CardArticleSummary />
          <CardArticleSummary />
          <CardArticleSummary />
          <CardArticleSummary />
          <CardArticleSummary />
          <CardArticleSummary />
        </div>
      </Container>
    </section>
  )
}

export default DocsArticles

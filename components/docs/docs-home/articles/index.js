import React from 'react'
import CardArticleSummary from '../../../common/cards/card-article-summary'
import Container from '../../../common/container'
import Title from '../../../common/title'
import styles from './index.module.css'
import gradientBg from '../../../../assets/images/docs/articles/gradient-bg.svg'
import tempImg from '../../../../assets/images/docs/articles/article-summary.png'

const articles = [
  {
    id: 1,
    title: 'What is API? Let’s Getting Started with the API!',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    img: tempImg,
    href: '/',
    date: 'May 20th 2020',
  },
  {
    id: 2,
    title: 'What is API? Let’s Getting Started with the API!',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    img: tempImg,
    href: '/',
    date: 'May 20th 2020',
  },
  {
    id: 3,
    title: 'What is API? Let’s Getting Started with the API!',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    img: tempImg,
    href: '/',
    date: 'May 20th 2020',
  },
  {
    id: 4,
    title: 'What is API? Let’s Getting Started with the API!',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    img: tempImg,
    href: '/',
    date: 'May 20th 2020',
  },
  {
    id: 5,
    title: 'What is API? Let’s Getting Started with the API!',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    img: tempImg,
    href: '/',
    date: 'May 20th 2020',
  },
  {
    id: 6,
    title: 'What is API? Let’s Getting Started with the API!',
    content:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that....',
    img: tempImg,
    href: '/',
    date: 'May 20th 2020',
  },
]

const DocsArticles = ({stories}) => {
  {
    console.log(stories[0].content.content)
  }
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
          {stories.map((card) => (
            <CardArticleSummary
              key={card.id}
              title={card.content.content[0].title}
              p={card.content.content[0].intro_text}
              img={card.content.content[0].image.filename}
              href={"/docs/" + card.slug}
              date={new Date(card.published_at).toLocaleString()}
            />
          ))}
          {/* {articles.map((card) => (
            <CardArticleSummary
              key={card.id}
              title={card.title}
              p={card.content}
              img={card.img}
              href={card.href}
              date={card.date}
            />
          ))} */}
        </div>
      </Container>
    </section>
  )
}

export default DocsArticles

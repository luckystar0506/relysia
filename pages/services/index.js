import React from 'react'
import Header from '../../components/Layouts/header'
import Footer from '../../components/Layouts/footer'
import GoTop from '../../components/Layouts/GoTop'
import ServicesContent from '../../components/services/ServicesContent'
import Head from 'next/head'

class Features extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ServicesContent />
        <Footer />
        <GoTop scrollStepInPx="50" delayInMs="16.66" />
        <Head>
          <title>Services | Relysia</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </div>
    )
  }
}

export default Features

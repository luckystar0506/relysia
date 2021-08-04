import React from 'react'
import Header from '../components/Layouts/header'
import Footer from '../components/Layouts/footer'
import GoTop from '../components/Layouts/GoTop'
import PageTitle from '../components/contact/PageTitle'
import ContactBody from '../components/contact/ContactBody'
import Head from 'next/head'

export default () => (
  <div>
    <Header />
    <PageTitle />
    <ContactBody />
    <Footer />
    <GoTop scrollStepInPx="50" delayInMs="16.66" />
    <Head>
      <title>Contact | Relysia</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  </div>
)

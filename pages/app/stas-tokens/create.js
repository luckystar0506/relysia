import React, { useEffect } from 'react'
import Header from '../../../components/Layouts/header'
import Footer from '../../../components/Layouts/footer'
import GoTop from '../../../components/Layouts/GoTop'
import CreateToken from '../../../components/stasTokens/CreateToken'
import Head from 'next/head'
import { useRouter } from 'next/router'
import firebase from '../../../config/fire-conf'

export default () => {
  const router = useRouter()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push('/auth/login')
      }
    })
  }, [])

  return (
    <div>
      <Header />
      <CreateToken />
      <Footer />
      <GoTop scrollStepInPx="50" delayInMs="16.66" />
      <Head>
        <title>Create New Token | Relysia</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </div>
  )
}

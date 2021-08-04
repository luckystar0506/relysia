import React, { useEffect, useState } from 'react'
import Header from '../components/Layouts/header'
import Footer from '../components/Layouts/footer'
import GoTop from '../components/Layouts/GoTop'
import PageTitle from '../components/profile/PageTitle'
import ProfileView from '../components/profile/ProfileView'
import firebase from '../config/fire-conf'
import { useRouter } from 'next/router'
import Head from 'next/head'

function Features() {
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
      <PageTitle />
      <ProfileView />

      <Footer />
      <GoTop scrollStepInPx="50" delayInMs="16.66" />
      <Head>
        <title>Profile | Relysia</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </div>
  )
}

export default Features

import React, { useEffect } from 'react'
import { Preloader, Placeholder } from 'react-preloading-screen'
import NoSSR from 'react-no-ssr'

import Head from 'next/head'
import { useRouter } from 'next/router'
import firebase from '../config/fire-conf'
import Home from './home'

function Index() {
  const router = useRouter()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('router.query.loggedin', router.query.loggedin)
      if (user && !router.query.loggedin) {
        router.push('/app/wallet/vaionex-wallet')
      }
    })
  }, [])

  return (
    <NoSSR>
      <Preloader>
        <Placeholder>
          <div className="preloader">
            <div className="spinner"></div>
          </div>
        </Placeholder>
        <Home />
      </Preloader>
      <Head>
        <title>Relysia - The Bitcoin database</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </NoSSR>
  )
}

export default Index

import React, { useEffect } from 'react'
import MainBanner from '../../components/register/MainBanner'
import { useRouter } from 'next/router'
import firebase from '../../config/fire-conf'
import Head from 'next/head'

function Login() {
  const router = useRouter()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        router.push('/app/wallet/vaionex-wallet')
      }
    })
  }, [])

  return (
    <>
      <MainBanner />

      <Head>
        <title>Register | Relysia</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </>
  )
}

export default Login

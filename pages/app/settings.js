import React from 'react'
import NoSSR from 'react-no-ssr'
import Header from '../../components/Layouts/header'
import Footer from '../../components/Layouts/footer'
import GoTop from '../../components/Layouts/GoTop'
import SettingsPage from '../../components/settings/SettingsPage'
import DashboardSidebar from '../../components/Layouts/DashboardSidebar'
import Head from 'next/head'

class Settings extends React.Component {
  render() {
    return (
      <NoSSR>
        <div>
          <Header />
          <DashboardSidebar>
            <SettingsPage />
          </DashboardSidebar>
          <Footer />
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </div>
        <Head>
          <title>Settings | Relysia</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      </NoSSR>
    )
  }
}

export default Settings

import React from 'react'
import NoSSR from 'react-no-ssr'
import Header from '../../components/Layouts/header'
import Footer from '../../components/Layouts/footer'
import DocsHome from '../../components/docs/docs-home'
import { CloudThreeSVG } from '../../components/common/svgs/clouds'

class DocsOverview extends React.Component {
  render() {
    return (
      <NoSSR>
        <div className="page">
          <CloudThreeSVG top="20%" opacity="0.2" />
          <CloudThreeSVG top="62%" />
          <Header />
          <DocsHome />
          <Footer />
        </div>
      </NoSSR>
    )
  }
}

export default DocsOverview

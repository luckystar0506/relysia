import React from 'react'
import NoSSR from 'react-no-ssr'
import Header from '../../components/Layouts/header'
import Footer from '../../components/Layouts/footer'
import GoTop from '../../components/Layouts/GoTop'
// import RelysiaOverviewPage from "../../components/docs/Overview";
// import DocsContainer from "../../components/Layouts/DocsContainer";
import NewDocsContainer from '../../components/Layouts/NewDocsContainer'
import { listData } from '../../components/docs/data/DocsListData'

class DocsOverview extends React.Component {
  render() {
    return (
      <NoSSR>
        <div>
          <Header />
          {/* <DocsContainer>
            <RelysiaOverviewPage />
          </DocsContainer> */}
          <NewDocsContainer data={{ groupData: listData }} />
          <Footer />
          <GoTop scrollStepInPx="50" delayInMs="16.66" />
        </div>
      </NoSSR>
    )
  }
}

export default DocsOverview

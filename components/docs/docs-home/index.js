import React from 'react'
import DownloadOurApp from '../../Layouts/shared-sections/download-our-app'
import DocsArticles from './articles'
import DocsHero from './hero'
import DocsPlatform from './platform'

const DocsHome = ({stories}) => {  
  return (
    <div className="relative">
      <DocsHero />
      <DocsPlatform />
      <DocsArticles stories = {stories}/>
      <DownloadOurApp />
    </div>
  )
}

export default DocsHome

import React from 'react'
import DownloadOurApp from '../../Layouts/shared-sections/download-our-app'
import DocsArticles from './articles'
import DocsHero from './hero'
import DocsPlatform from './platform'

const DocsHome = () => {
  return (
    <div className="relative">
      <DocsHero />
      <DocsPlatform />
      <DocsArticles />
      <DownloadOurApp />
    </div>
  )
}

export default DocsHome

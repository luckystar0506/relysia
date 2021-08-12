import React from 'react'
import DocsArticles from './articles'
import DocsHero from './hero'
import DocsPlatform from './platform'

const DocsHome = () => {
  return (
    <div className="relative">
      <DocsHero />
      <DocsPlatform />
      <DocsArticles />
    </div>
  )
}

export default DocsHome

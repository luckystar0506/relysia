import React from 'react'
import NoSSR from 'react-no-ssr'
import Header from '../../components/Layouts/header'
import Footer from '../../components/Layouts/footer'
import DocsHome from '../../components/docs/docs-home'
import { CloudThreeSVG } from '../../components/common/svgs/clouds'

// The Storyblok Client
import Storyblok from "../../lib/storyblok"

class DocsOverview extends React.Component {
  static async getInitialProps(context) {
    // the slug of the story
    let slug = "home"
    // the storyblok params
    let params = {
      version: "draft", // or 'published' / ' draft
    }
  
    // checks if Next.js is in preview mode
    if (context.preview) {
      // loads the draft version
      params.version = "draft"
      // appends the cache version to get the latest content
      params.cv = Date.now()
    }
  
    let links = await Storyblok.get('cdn/links/', {
      starts_with: 'article'
    })
    
    let stories = [];
    let test = links.data.links;
  
    for (const property in test) {
      const { slug } = test[property]; 
      const { data } = await Storyblok.get(`cdn/stories/${slug}`, params);
      stories.push(data.story);
    }
    
    // sorting stories
    const sorting = (a, b) => {
      const aPublish = new Date(a.published_at).getTime();
      const bPublish = new Date(b.published_at).getTime();
      return aPublish < bPublish ? 1 : -1;
    }
    stories = stories.sort(sorting);
    
    // return the story from Storyblok and whether preview mode is active
    return {
      stories: stories,
      preview: context.preview || false      
    }
  }

  render() {    
    return (
      <NoSSR>
        <div className="page">
          <CloudThreeSVG top="20%" opacity="0.2" />
          <CloudThreeSVG top="62%" />
          <Header />
          <DocsHome stories = {this.props.stories} />
          <Footer />
        </div>
      </NoSSR>
    )
  }
}

export default DocsOverview


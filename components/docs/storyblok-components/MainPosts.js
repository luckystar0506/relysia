import Component from './DynamicComponent'
import SbEditable from 'storyblok-react'

const MainPosts = ({blok}) => {
  
  return (  
  <SbEditable content={blok}>
    <ul className="mb-6">
      {blok.rows.map((blok) =>
        <li key={blok._uid} className="pb-8">
          <Component blok={blok} />
        </li>
      )}
    </ul>
  </SbEditable>
)}

export default MainPosts

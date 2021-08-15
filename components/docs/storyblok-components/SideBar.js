import Component from './DynamicComponent'
import SbEditable from 'storyblok-react'

const SideBar = ({blok}) => {
  return (  
  <SbEditable content={blok}>
    <div className="w-full pl-2">      
      <p className="blog__sidebar__title">
        Twitter feed
      </p>
      <div>
        
      </div>
    </div>
    <div className="w-full pl-2">      
      <p className="blog__sidebar__title">
        Music art stream
      </p>
      <div className="blog__sidebar__item row">
        {blok.contents.map((blok) =>
          <div className="w-3/12">
            <div className="p-1">
              <img src={blok.image.filename}>
              </img>
            </div>
          </div>
        )}
      </div>
    </div>
  </SbEditable>
)}

export default SideBar

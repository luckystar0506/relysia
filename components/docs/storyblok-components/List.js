import Component from './DynamicComponent'
import SbEditable from 'storyblok-react'

const List = ({blok}) => (
  <SbEditable content={blok}>
    <ul className="flex py-8 mb-6">
      {blok.columns.map((blok) =>
        <li key={blok._uid} className="flex-auto px-6">
          <Component blok={blok} />
        </li>
      )}
    </ul>
  </SbEditable>
)

export default List

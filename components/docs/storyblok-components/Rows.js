import Component from './DynamicComponent'
import SbEditable from 'storyblok-react'

const Rows = ({blok}) => (
  <SbEditable content={blok}>
    <ul className="py-8 mb-6">
      {blok.rows.map((blok) =>
        <li key={blok._uid} className="px-6">
          <Component blok={blok} />
        </li>
      )}
    </ul>
  </SbEditable>
)

export default Rows

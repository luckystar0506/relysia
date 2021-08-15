import DynamicComponent from './DynamicComponent'
import SbEditable from 'storyblok-react'

const Page = ({content, full,  published_at, slug}) => (
  <SbEditable content={content} full={full} published_at={published_at} slug={slug}>
    <main>
      {content.body.map((blok) =>
        <DynamicComponent blok={blok} key={blok._uid} full={full} published_at={published_at} slug={slug}/>
      )}
    </main>
  </SbEditable>
)

export default Page

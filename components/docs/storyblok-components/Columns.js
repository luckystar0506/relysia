import Component from './DynamicComponent'
import SbEditable from 'storyblok-react'

const Columns = ({blok}) => (
  <SbEditable content={blok}>
    <div className="flex flex-wrap py-8 mb-6">
      {blok.columns.map((blok) => {
        
        const genClass = (blok) => {
          const { styles } = blok;
          // return `flex-auto xl:w-${styles.xlarge}/12 lg:w-${styles.large}/12 md:w-${styles.medium}/12 sm:w-${styles.small}/12`
          return `w-full lg:w-${styles.large}/12 md:w-${styles.medium}/12 sm:w-${styles.small}/12`
        }
        return  (
          <div key={blok._uid} className={genClass(blok)}>
            <Component blok={blok} />
          </div>
        )}
      )}
    </div>
  </SbEditable>
)

export default Columns

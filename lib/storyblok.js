import StoryblokClient from 'storyblok-js-client'

const Storyblok = new StoryblokClient({
    accessToken: 'G57Wdb4LffVNQBEkdJrz3Att',
    cache: {
      clear: 'auto',
      type: 'memory'
    }
})

export default Storyblok

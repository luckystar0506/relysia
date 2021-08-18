import StoryblokClient from 'storyblok-js-client'

const Storyblok = new StoryblokClient({
//    accessToken: 'G57Wdb4LffVNQBEkdJrz3Att',
    accessToken: 'ZYwFcTtpg4wBStrM7GVsLAtt',
    cache: {
      clear: 'auto',
      type: 'memory'
    }
})

export default Storyblok

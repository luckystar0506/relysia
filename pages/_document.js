import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <meta charSet="utf-8" /> */}
          <link
            rel="icon"
            type="image/png"
            href={require('../static/images/favicon.ico')}
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

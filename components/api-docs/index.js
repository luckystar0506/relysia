import { RedocStandalone } from 'redoc'
import Header from '../Layouts/header'
import Footer from '../Layouts/footer'

const APIDocs = () => {
  return (
    <>
      <Header />
      <div id="redoc-container" className="min-h-screen">
        <RedocStandalone
          specUrl="https://wallet.vaionex.com/docs/json"
          options={{
            nativeScrollbars: true,
            hideDownloadButton: true,
            hideLoading: true,
            theme: {
              colors: {
                primary: {
                  main: '#343450',
                },
                text: {
                  primary: '#ccc',
                  secondary: '#fe2c3d',
                },
                responses: {},
              },
              schema: {
                linesColor: 'transparent',
                typeNameColor: '#eee',
                typeTitleColor: '#eee',
                nestedBackground: '#222235',
              },
              typography: {
                fontFamily: 'Sofia Pro',
                headings: {
                  fontFamily: 'Sofia Pro',
                  fontWeight: '700',
                },
              },
              sidebar: {
                width: '320px',
                backgroundColor: '#343450',
                textColor: '#fff',
                activeTextColor: '#fe2c3d',
                fontFamily: 'Sofia Pro',
              },
              rightPanel: {
                backgroundColor: '#222235',
                width: '45%',
              },
            },
          }}
        />
      </div>
      <Footer />
    </>
  )
}

export default APIDocs

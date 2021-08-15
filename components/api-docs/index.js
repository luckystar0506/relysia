import { RedocStandalone } from 'redoc'
import APIHeader from '../Layouts/api-docs/api-header'
import APISidebar from '../Layouts/api-docs/api-sidebar'

const APIDocs = () => {
  return (
    <div>
      <APIHeader />
      <div>
        <APISidebar />
        <RedocStandalone specUrl="https://wallet.vaionex.com/docs/json" />
      </div>
    </div>
  )
}

export default APIDocs

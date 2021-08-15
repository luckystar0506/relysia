import MainPosts from './MainPosts'
import SideBar from './SideBar'
import Article from './Article'
import Feature from './Feature'
import List from './List'
import Placeholder from './Placeholder'
import Layout from './Layout'
import Columns from './Columns'
import Rows from './Rows'


const Components = {
    'main_posts': MainPosts,
    'side_bar': SideBar,
    'article': Article,
    'feature': Feature,
    'list': List,
    'layout': Layout,
    'columns': Columns,
    'rows': Rows,
}

const DynamicComponent = ({ blok , full ,published_at, slug}) => {
    
    if (typeof Components[blok.component] !== 'undefined') {
        const Component = Components[blok.component]
        return <Component blok = { blok } full={ full } published_at={published_at} slug={slug}/>
    }
    return <Placeholder componentName = { blok.component } />
}

export default DynamicComponent

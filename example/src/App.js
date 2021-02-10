import React from 'react'
import "fontsource-roboto";
import { AppLayout } from 'euler-search-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import WikipediaSearch from './pages/WikipediaSearch'
import AppMenu from './components/AppMenu'
import 'euler-search-components/dist/index.css'

const App = () => {
  return (
    <Router>
      <AppLayout title='Euler Search Components' menu={<AppMenu />}>
        <Switch>
          <Route exact path='/wikipedia'>
            <WikipediaSearch />
          </Route>
          <Route exact path='/'>
            <div>Home</div>
          </Route>
        </Switch>
      </AppLayout>
    </Router>
  )
}

export default App

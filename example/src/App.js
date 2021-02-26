import React from 'react'
import 'fontsource-roboto'
import { AppLayout } from 'euler-search-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ArchiveOrgSearch from './pages/ArchiveOrgSearch'
import AppMenu from './components/AppMenu'
//import 'euler-search-components/dist/index.css'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <AppLayout title='Euler Search Components' menu={<AppMenu />}>
          <Switch>
            <Route exact path='/archiveorg'>
              <ArchiveOrgSearch />
            </Route>
            <Route exact path='/'>
              <div>Home</div>
            </Route>
          </Switch>
        </AppLayout>
      </Router>
    </MuiPickersUtilsProvider>
  )
}

export default App

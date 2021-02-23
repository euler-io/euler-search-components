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
    <Router>
      <MuiPickersUtilsProvider utils={MomentUtils}>
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
      </MuiPickersUtilsProvider>
    </Router>
  )
}

export default App

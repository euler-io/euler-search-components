import React from 'react'
import 'fontsource-roboto'
import { AppLayout } from 'euler-search-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ArchiveOrgSearch from './pages/ArchiveOrgSearch'
import ArchiveOrgSearchRuntime from './pages/ArchiveOrgSearchRuntime'
import ResultsListDemo from './pages/ResultsListDemo'
import AppMenu from './components/AppMenu'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import TextDetailPage from './pages/TextDetailPage'
import MetadataDetailPage from './pages/MetadataDetailPage'
import ImageDetailPage from './pages/ImageDetailPage'

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <AppLayout title='Euler Search Components' menu={<AppMenu />}>
          <Switch>
            <Route exact path='/archiveorg'>
              <ArchiveOrgSearch />
            </Route>
            <Route exact path='/detail/text'>
              <TextDetailPage />
            </Route>
            <Route exact path='/detail/metadata'>
              <MetadataDetailPage />
            </Route>
            <Route exact path='/detail/image'>
              <ImageDetailPage />
            </Route>
            <Route exact path='/archiveorgruntime'>
              <ArchiveOrgSearchRuntime />
            </Route>
            <Route exact path='/components/results/resultslist'>
              <ResultsListDemo />
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

import React from 'react'
import { Breadcrumbs } from '@material-ui/core'
import { SearchBarFilter, QueryState } from 'euler-search-components'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  searchArea: {
    margin: theme.spacing(2, 'auto')
  }
})

const WikipediaSearch = (props) => {
  const { classes, history, location } = props
  const queryState = new QueryState(history, location)
  const parameters = queryState.getParameters()

  const handleParametersChanged = (newParameters, refresh = true) => {
    if (refresh) {
      queryState.updateQuery(newParameters)
    }
  }

  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        <div>Wikipedia Opensearch</div>
      </Breadcrumbs>
      <div className={classes.searchArea}>
        <SearchBarFilter
          field='search'
          parameters={parameters}
          onParametersChanged={handleParametersChanged}
        />
      </div>
      <div className={classes.searchArea}>Results</div>
    </div>
  )
}

export default withRouter(withStyles(styles)(WikipediaSearch))

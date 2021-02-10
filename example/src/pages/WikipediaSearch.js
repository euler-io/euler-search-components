import React from 'react'
import { Breadcrumbs } from '@material-ui/core'
import { SearchBarFilter, withQueryState } from 'euler-search-components'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  searchArea: {
    margin: theme.spacing(2, 'auto')
  }
})

const WikipediaSearch = (props) => {
  const { classes } = props

  const handleParametersChanged = (newParameters, refresh = true) => {
    //if (refresh) {
    //  queryState.updateQuery(location, newParameters)
    //}
    console.info(newParameters, refresh)
  }

  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        <div>Wikipedia Opensearch</div>
      </Breadcrumbs>
      <div className={classes.searchArea}>
        <SearchBarFilter
          field='search'
          onParametersChanged={handleParametersChanged}
        />
      </div>
      <div className={classes.searchArea}>Results</div>
    </div>
  )
}

export default withQueryState(withStyles(styles)(WikipediaSearch))

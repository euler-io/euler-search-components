import React, { useEffect } from 'react'
import { Breadcrumbs } from '@material-ui/core'
import {
  SearchBarFilter,
  QueryState,
  ResultsList
} from 'euler-search-components'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import create from 'zustand'
import qs from 'querystring'

const styles = (theme) => ({
  searchFilters: {
    margin: theme.spacing(4, 'auto'),
    padding: theme.spacing(2, 4)
  },
  searchResults: {
    margin: theme.spacing(2, 'auto')
  }
})

const useStore = create((set) => ({
  results: null,
  loading: false,
  setResultsUndefined: () => {
    set((state) => ({ loading: false, results: null }))
  },
  searchArchiveOrg: (search) => {
    const API_URL = 'https://archive.org/advancedsearch.php'
    const params = {
      'fl[]': ['title', 'description', 'identifier'],
      rows: 10,
      output: 'json',
      q: `subject:${search}`,
      page: 1
    }
    axios
      .get(`${API_URL}?${qs.stringify(params)}`)
      .then((response) => {
        const results = response.data.response.docs
        set((state) => ({ loading: false, results }))
      })
      .catch((e) => {
        console.info('error', e)
        set((state) => ({ loading: false, results: null }))
      })
  }
}))

const ArchiveOrgSearch = (props) => {
  const { classes, history, location } = props
  const queryState = new QueryState(history, location)
  const parameters = queryState.getParameters()

  const handleParametersChanged = (newParameters, refresh = true) => {
    if (refresh) {
      queryState.updateQuery(newParameters)
    }
  }
  const { results, searchArchiveOrg, setResultsUndefined } = useStore()

  useEffect(() => {
    console.info('query changed')
    const { search } = parameters
    if (search && search.trim()) {
      searchArchiveOrg(search)
    } else {
      setResultsUndefined()
    }
  }, [])

  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        <div>Archive.org Search</div>
      </Breadcrumbs>
      <div className={classes.searchFilters}>
        <SearchBarFilter
          field='search'
          parameters={parameters}
          onParametersChanged={handleParametersChanged}
        />
      </div>
      <div className={classes.searchResults}>
        {results !== null && (
          <ResultsList
            results={results}
            decodeItem={(i) => {
              return {
                key: i.identifier,
                title: i.title,
                description: i.description,
                link: `https://archive.org/details/${i.identifier}`
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

export default withRouter(withStyles(styles)(ArchiveOrgSearch))

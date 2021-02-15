import React, { useEffect } from 'react'
import { Breadcrumbs, Typography } from '@material-ui/core'
import {
  SearchBarFilter,
  QueryState,
  ResultsList,
  ResultStatistics,
  ResultsPagination
} from 'euler-search-components'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import create from 'zustand'
import qs from 'querystring'
import LoadingOverlay from 'react-loading-overlay'

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
  total: null,
  took: null,
  query: null,
  setResultsUndefined: () => {
    set((state) => ({
      loading: false,
      results: null,
      total: null,
      took: null,
      query: null
    }))
  },
  searchArchiveOrg: (parameters) => {
    const { search, page, rows } = parameters
    const API_URL = 'https://archive.org/advancedsearch.php'
    const params = {
      'fl[]': ['title', 'description', 'identifier'],
      rows: rows ? parseInt(rows) : 10,
      output: 'json',
      q: `subject:${search}`,
      page: page ? parseInt(page) + 1 : 1
    }
    set((state) => ({
      loading: true
    }))
    axios
      .get(`${API_URL}?${qs.stringify(params)}`)
      .then((response) => {
        const results = response.data.response.docs
        const total = response.data.response.numFound
        set((state) => ({
          loading: false,
          results,
          total,
          took: 0,
          query: search
        }))
      })
      .catch((e) => {
        console.info('error', e)
        set((state) => ({
          loading: false,
          results: null,
          total: null,
          took: null,
          query: null
        }))
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
  const {
    results,
    searchArchiveOrg,
    setResultsUndefined,
    total,
    took,
    query,
    loading
  } = useStore()

  useEffect(() => {
    const parameters = queryState.getParameters()
    const { search } = parameters
    if (search && search.trim()) {
      searchArchiveOrg(parameters)
    } else {
      setResultsUndefined()
    }
  }, [parameters.search, parameters.page, parameters.rows])

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
        <LoadingOverlay active={loading} spinner={true}>
          {results !== null ? (
            <>
              <ResultStatistics query={query} total={total} took={took} />
              <ResultsPagination
                count={total}
                parameters={parameters}
                onParametersChanged={handleParametersChanged}
                rowsPerPageParameter='rows'
                position='right'
              />
              <ResultsList
                results={results}
                decodeItem={(i) => {
                  return {
                    key: i.identifier,
                    title: i.title,
                    description: i.description ? i.description : '',
                    thumbnail: `https://archive.org/services/img/${i.identifier}`,
                    link: `https://archive.org/details/${i.identifier}`
                  }
                }}
              />
              <ResultsPagination
                count={total}
                parameters={parameters}
                onParametersChanged={handleParametersChanged}
                rowsPerPageParameter='rows'
                position='center'
              />
            </>
          ) : (
            <Typography color='textSecondary'>No results to show.</Typography>
          )}
        </LoadingOverlay>
      </div>
    </div>
  )
}

export default withRouter(withStyles(styles)(ArchiveOrgSearch))

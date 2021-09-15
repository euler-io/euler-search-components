import React from 'react'
import { Breadcrumbs, Typography } from '@material-ui/core'
import {
  SearchBarFilter,
  OptionsFilter,
  AutoCompleteOptionsFilter,
  DateRangeFilter,
  SortFilter,
  BooleanFilter,
  RangeFilter,
  QueryState,
  ResultsList,
  ResultStatistics,
  ResultsPagination,
  FiltersPopover,
  useParametersEffect,
  parseDateRangeParameters,
  toArray
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
    const { search, mediaType, page, rows, date } = parameters
    const API_URL = 'https://archive.org/advancedsearch.php'
    let query = search
    if (mediaType && Array.isArray(mediaType) && mediaType.length > 0) {
      query += ` AND mediatype:(${mediaType.join(' OR ')})`
    } else if (mediaType) {
      query += ` AND mediatype:(${mediaType})`
    }
    if (date && date.length > 0) {
      const dateValues = toArray(date)
      const parsedDates = parseDateRangeParameters(dateValues)
      let initial = null
      let final = null
      if (parsedDates.initial === null) {
        initial = new Date(1900, 1, 1, 0, 0, 0)
      } else {
        initial = new Date(parsedDates.initial)
      }
      if (parsedDates.final === null) {
        final = new Date()
      } else {
        final = new Date(parsedDates.final)
      }
      const initialStr = `${initial.getFullYear()}-${initial.getMonth()}-${initial.getDay()}`
      const finalStr = `${final.getFullYear()}-${final.getMonth()}-${final.getDay()}`
      query += ` AND date:[${initialStr} TO ${finalStr}]`
    }
    const params = {
      'fl[]': ['title', 'description', 'identifier'],
      rows: rows ? parseInt(rows) : 10,
      output: 'json',
      q: query,
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

  useParametersEffect(
    () => {
      const parameters = queryState.getParameters()
      const { search } = parameters
      if (search && search.trim()) {
        searchArchiveOrg(parameters)
      } else {
        setResultsUndefined()
      }
    },
    parameters,
    ['search', 'mediaType', 'page', 'rows', 'date']
  )

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
        <FiltersPopover
          filters={[
            { field: 'mediaType', name: 'Media Type' },
            { field: 'date', name: 'Date' },
            { field: 'boolean', name: 'Boolean' },
            { field: 'size', name: 'Size' }
          ]}
          onParametersChanged={(newParameters) => {
            handleParametersChanged({ ...newParameters, ...parameters })
          }}
        />
        <SortFilter
          values={[{ value: 'created_datetime', label: 'Created Date' }]}
          onParametersChanged={(newParameters) => {
            handleParametersChanged({ ...parameters, ...newParameters })
          }}
          parameters={parameters}
          defaultLabel='Relevance'
        />
        <div>
          <OptionsFilter
            name='Media Type'
            field='mediaType'
            parameters={parameters}
            onParametersChanged={handleParametersChanged}
            options={[
              { value: 'account', label: 'Account' },
              { value: 'audio', label: 'Audio' },
              { value: 'data', label: 'Data' },
              { value: 'image', label: 'Image' },
              { value: 'movies', label: 'Movies' },
              { value: 'text', label: 'Texts' },
              { value: 'web', label: 'Web' }
            ]}
          />
          <BooleanFilter
            name='Boolean'
            field='boolean'
            parameters={parameters}
            onParametersChanged={handleParametersChanged}
          />
          <AutoCompleteOptionsFilter
            name='Media Type'
            field='mediaType'
            parameters={parameters}
            onParametersChanged={handleParametersChanged}
            options={[
              { value: 'account', label: 'Account' },
              { value: 'audio', label: 'Audio' },
              { value: 'data', label: 'Data' },
              { value: 'image', label: 'Image' },
              { value: 'movies', label: 'Movies' },
              { value: 'text', label: 'Texts' },
              { value: 'web', label: 'Web' }
            ]}
          />
          <DateRangeFilter
            name='Date'
            field='date'
            parameters={parameters}
            onParametersChanged={handleParametersChanged}
          />
          <RangeFilter
            name='Size'
            field='size'
            parameters={parameters}
            onParametersChanged={handleParametersChanged}
            unlimitedBoundaries={true}
            min={0}
            max={8000000}
            step={1000}
            presetsOnly={true}
            presets={[
              {
                id: 'small',
                label: 'Small',
                value: [0, 50000]
              },
              {
                id: 'medium',
                label: 'Medium',
                value: [50000, 350000]
              },
              {
                id: 'big',
                label: 'Big',
                value: [350000, 8000000]
              }
            ]}
          />
        </div>
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
                    title: i.title.replaceAll(query, `<em>${query}</em>`),
                    description: i.description
                      ? i.description.replaceAll(query, `<em>${query}</em>`)
                      : '',
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

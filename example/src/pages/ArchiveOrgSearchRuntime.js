import React from 'react'
import {
  QueryState,
  Search,
  useParametersEffect
} from 'euler-search-components'
import ArchiveOrg, { searchArchiveOrg } from '../runtime/ArchiveOrg'
import { withRouter } from 'react-router-dom'
import create from 'zustand'

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
    searchArchiveOrg(parameters)
      .then((response) => {
        const results = response.data.response.docs
        const total = response.data.response.numFound
        set((state) => ({
          loading: false,
          results,
          total,
          took: 0,
          query: parameters.search
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

const ArchiveOrgSearchRuntime = (props) => {
  const { history, location } = props
  const queryState = new QueryState(history, location)
  const parameters = queryState.getParameters()
  const config = { ...ArchiveOrg }

  const handleParametersChanged = (newParameters) => {
    queryState.updateQuery({ ...newParameters })
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
      const currParameters = queryState.getParameters()
      const { search } = currParameters
      if (search && search.trim()) {
        searchArchiveOrg(currParameters)
      } else {
        setResultsUndefined()
      }
    },
    parameters,
    ['search', 'mediaType', 'page', 'rows', 'date']
  )

  return (
    <Search
      {...config}
      results={results}
      parameters={parameters}
      onParametersChanged={handleParametersChanged}
      decodeItem={(i) => {
        return {
          key: i.identifier,
          title: i.title,
          type: 'simple',
          description: i.description ? i.description : '',
          thumbnail: `https://archive.org/services/img/${i.identifier}`,
          link: `https://archive.org/details/${i.identifier}`
        }
      }}
    />
  )
}

export default withRouter(ArchiveOrgSearchRuntime)

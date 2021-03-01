import React from 'react'
import { QueryState, Search } from 'euler-search-components'
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
  //const parameters = queryState.getParameters()

  const handleParametersChanged = (newParameters) => {
    queryState.updateQuery({ ...newParameters })
  }

  return (
    <Search {...ArchiveOrg} onParametersChanged={handleParametersChanged} />
  )
}

export default withRouter(ArchiveOrgSearchRuntime)

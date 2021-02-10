import React, { useState } from 'react'
import SearchBar from 'material-ui-search-bar'
import PropTypes from 'prop-types'

const SearchBarFilter = (props) => {
  const { field, onParametersChanged, parameters, ...rest } = props
  const value = parameters[field] ? parameters[field] : ''
  const [query, setQuery] = useState(value)
  return (
    <SearchBar
      value={query}
      onChange={(value) => setQuery(value)}
      onCancelSearch={() => setQuery('')}
      onRequestSearch={() => {
        const filter = {}
        filter[field] = query
        onParametersChanged(filter)
      }}
      style={{
        margin: '0 auto'
      }}
      {...rest}
    />
  )
}

SearchBarFilter.propTypes = {
  field: PropTypes.string.isRequired,
  onParametersChanged: PropTypes.func.isRequired,
  parameters: PropTypes.object
}

SearchBarFilter.defaultProps = {
  parameters: {}
}

export default SearchBarFilter

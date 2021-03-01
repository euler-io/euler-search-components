import React, { useState, useEffect } from 'react'
import SearchBar from 'material-ui-search-bar'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  searchBar: {
    margin: '0 auto'
  }
})

const SearchBarFilter = (props) => {
  const { classes, field, onParametersChanged, parameters, ...rest } = props
  const value = parameters[field] ? parameters[field] : ''
  const [query, setQuery] = useState(value)
  useEffect(() => {
    setQuery(value)
  }, [value])
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
      className={classes.searchBar}
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

export default withStyles(styles)(SearchBarFilter)

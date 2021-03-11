import React from 'react'
import { Breadcrumbs, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Filters from './Filters'
import Results from './Results'
import ResultsList from '../results/ResultsList'

const styles = (theme) => ({
  searchFilters: {
    margin: theme.spacing(4, 'auto'),
    padding: theme.spacing(2, 4)
  },
  searchResults: {
    margin: theme.spacing(2, 'auto')
  }
})

const defaultLabels = {
  noResults: 'No results to show.'
}

const _decodeItem = (r) => {
  return r
}

const Search = (props) => {
  const {
    title,
    filters,
    classes,
    filtersComponents,
    onParametersChanged,
    resultComponents,
    results,
    labels,
    decodeItem
  } = props
  const FiltersComponents = filtersComponents
  const componentLabels = { ...defaultLabels, ...labels }
  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        <div>{title}</div>
      </Breadcrumbs>
      <div className={classes.searchFilters}>
        {filters.map((f, fIndex) => {
          const Component = FiltersComponents(f)
          return (
            <Component
              key={fIndex}
              {...f}
              filtersComponents={filtersComponents}
              onParametersChanged={onParametersChanged}
            />
          )
        })}
        <div className={classes.searchResults}>
          {results !== null && results !== undefined ? (
            <React.Fragment>
              <ResultsList
                decodeItem={decodeItem}
                resultComponents={resultComponents}
                results={results}
              />
            </React.Fragment>
          ) : (
            <Typography color='textSecondary'>
              {componentLabels.noResults}
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}

Search.propTypes = {
  title: PropTypes.string.isRequired,
  onParametersChanged: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  filtersComponents: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  resultComponents: PropTypes.func,
  decodeItem: PropTypes.func,
  labels: PropTypes.object
}

Search.defaultProps = {
  title: 'Euler Search',
  filters: [],
  filtersComponents: Filters,
  resultComponents: Results,
  decodeItem: _decodeItem,
  results: null,
  labels: defaultLabels
}
export default withStyles(styles)(Search)

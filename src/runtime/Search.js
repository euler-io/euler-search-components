import React from 'react'
import { Breadcrumbs, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Filters from './Filters'
import Results from './Results'
import ResultStatistics from '../results/ResultStatistics'
import ResultsPagination from '../results/ResultsPagination'
import LoadingOverlay from 'react-loading-overlay'
import ResultsModes from './ResultsModes'

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
    parameters,
    classes,
    filtersComponents,
    onParametersChanged,
    resultComponents,
    results,
    mode,
    labels,
    decodeItem,
    total,
    took,
    query,
    loading,
    modeComponents
  } = props
  const FiltersComponents = filtersComponents
  const ModeComponent = modeComponents(mode)
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
              parameters={parameters}
              filtersComponents={filtersComponents}
              onParametersChanged={onParametersChanged}
            />
          )
        })}
        <div className={classes.searchResults}>
          {results !== null && results !== undefined ? (
            <LoadingOverlay active={loading !== null && loading} spinner={true}>
              <React.Fragment>
                {query !== null && took !== null && (
                  <ResultStatistics query={query} total={total} took={took} />
                )}
                {total !== null && (
                  <ResultsPagination
                    count={total}
                    parameters={parameters}
                    onParametersChanged={onParametersChanged}
                    rowsPerPageParameter='rows'
                    position='right'
                  />
                )}
                <ModeComponent
                  decodeItem={decodeItem}
                  resultComponents={resultComponents}
                  results={results}
                  modeComponents={modeComponents}
                  {...mode}
                />
                {total !== null && (
                  <ResultsPagination
                    count={total}
                    parameters={parameters}
                    onParametersChanged={onParametersChanged}
                    rowsPerPageParameter='rows'
                    position='center'
                  />
                )}
              </React.Fragment>
            </LoadingOverlay>
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
  parameters: PropTypes.object,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  filtersComponents: PropTypes.func.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  resultComponents: PropTypes.func,
  modeComponents: PropTypes.func.isRequired,
  decodeItem: PropTypes.func,
  labels: PropTypes.object,
  total: PropTypes.number,
  took: PropTypes.number,
  query: PropTypes.string,
  loading: PropTypes.bool,
  mode: PropTypes.object
}

Search.defaultProps = {
  title: 'Euler Search',
  filters: [],
  parameters: {},
  filtersComponents: Filters,
  resultComponents: Results,
  modeComponents: ResultsModes,
  decodeItem: _decodeItem,
  results: null,
  labels: defaultLabels,
  total: null,
  took: null,
  query: null,
  loading: null,
  mode: { type: 'list' }
}
export default withStyles(styles)(Search)

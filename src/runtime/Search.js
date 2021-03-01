import React from 'react'
import { Breadcrumbs } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Filters from './Filters'

const styles = (theme) => ({
  searchFilters: {
    margin: theme.spacing(4, 'auto'),
    padding: theme.spacing(2, 4)
  },
  searchResults: {
    margin: theme.spacing(2, 'auto')
  }
})

const Search = (props) => {
  const {
    title,
    filters,
    classes,
    filtersComponents,
    onParametersChanged
  } = props
  const FiltersComponents = filtersComponents
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
      </div>
    </div>
  )
}

Search.propTypes = {
  title: PropTypes.string.isRequired,
  onParametersChanged: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  filtersComponents: PropTypes.func.isRequired
}

Search.defaultProps = {
  title: 'Euler Search',
  filters: [],
  filtersComponents: Filters
}
export default withStyles(styles)(Search)

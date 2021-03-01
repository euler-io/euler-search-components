import React from 'react'
import { FiltersPopover } from '..'
import PropTypes from 'prop-types'
import Filters from './Filters'

const FiltersPopoverRuntime = (props) => {
  const { onParametersChanged, filters, filtersComponents } = props
  console.info(filtersComponents)
  const FiltersComponents = filtersComponents
  return (
    <div>
      <FiltersPopover
        filters={filters}
        onParametersChanged={onParametersChanged}
      />
      <div>
        {filters.map((f, fIndex) => {
          const Component = FiltersComponents(f)
          return (
            <Component
              key={fIndex}
              {...f}
              onParametersChanged={onParametersChanged}
            />
          )
        })}
      </div>
    </div>
  )
}

FiltersPopoverRuntime.propTypes = {
  onParametersChanged: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  filtersComponents: PropTypes.func.isRequired
}

FiltersPopoverRuntime.defaultProps = {
  filters: [],
  filtersComponents: Filters
}

export default FiltersPopoverRuntime

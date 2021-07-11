import React from 'react'
import FiltersPopover from '../filters/FiltersPopover'
import PropTypes from 'prop-types'

const FiltersPopoverRuntime = (props) => {
  const { onParametersChanged, filters, filtersComponents, parameters } = props
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
              parameters={parameters}
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
  parameters: PropTypes.object,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  filtersComponents: PropTypes.func.isRequired
}

FiltersPopoverRuntime.defaultProps = {
  filters: [],
  parameters: {}
}

export default FiltersPopoverRuntime

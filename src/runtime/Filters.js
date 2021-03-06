import React from 'react'
import SearchBarFilter from '../filters/SearchBarFilter'
import DateRangeFilter from '../filters/DateRangeFilter'
import OptionsFilter from '../filters/OptionsFilter'
import FiltersPopoverRuntime from './FiltersPopoverRuntime'

const Filters = {
  text: SearchBarFilter,
  popover: FiltersPopoverRuntime,
  'options-dialog': OptionsFilter,
  'date-range-dialog': DateRangeFilter
}

const NotFoundFilter = (props) => {
  return <div>The filter {props.type} has not been created yet.</div>
}

export default (filter) => {
  const { type } = filter
  // component does exist
  if (typeof Filters[type] !== 'undefined') {
    return Filters[type]
  }
  // component doesn't exist yet
  return NotFoundFilter
}

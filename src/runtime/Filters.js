import React from 'react'
import SearchBarFilter from '../filters/SearchBarFilter'
import DateRangeFilter from '../filters/DateRangeFilter'
import OptionsFilter from '../filters/OptionsFilter'
import FiltersPopoverRuntime from './FiltersPopoverRuntime'
import SortFilter from '../filters/SortFilter'
import BooleanFilter from '../filters/BooleanFilter'
import AutoCompleteOptionsFilter from '../filters/AutoCompleteOptionsFilter'

const Filters = {
  text: SearchBarFilter,
  popover: FiltersPopoverRuntime,
  'options-dialog': OptionsFilter,
  'autocomplete-options-dialog': AutoCompleteOptionsFilter,
  'date-range-dialog': DateRangeFilter,
  sort: SortFilter,
  boolean: BooleanFilter
}

const NotFoundFilter = (props) => {
  console.info(props)
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

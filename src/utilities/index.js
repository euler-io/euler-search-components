import { useEffect } from 'react'

const toggleSelection = (value, selected) => {
  const selectedIndex = selected.indexOf(value)
  let newSelected = []

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, value)
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1))
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1))
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    )
  }

  return newSelected
}

const getLabel = (value, options) => {
  const option = options.find((o) => o.value === value)
  if (option) {
    return option.label
  } else {
    return
  }
}

const useParametersEffect = (fn, parameters, arr) => {
  useEffect(
    fn,
    arr.map((p) => {
      const v = parameters[p]
      if (Array.isArray(v)) {
        return v.join(',')
      } else if (v === null || v === undefined) {
        return ''
      } else {
        return v
      }
    })
  )
}

const getValues = (parameters, field) => {
  const values = parameters[field]
  if (values !== undefined && !Array.isArray(values)) {
    return [values]
  } else if (Array.isArray(values)) {
    return values
  } else {
    return []
  }
}

export { toggleSelection, getLabel, useParametersEffect, getValues }

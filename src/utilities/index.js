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
  }
}

const useParametersEffect = (fn, parameters, arr, asString = false) => {
  let effectArr = arr.map((p) => {
    const v = parameters[p]
    if (Array.isArray(v)) {
      return v.join(',')
    } else if (v === null || v === undefined) {
      return ''
    } else {
      return v
    }
  })
  if (asString) {
    effectArr = [effectArr.reduce((s, p) => `${s},${p}`, '')]
  }

  useEffect(fn, effectArr)
}

const toArray = (values) => {
  if (values !== undefined && !Array.isArray(values)) {
    return [values]
  } else if (Array.isArray(values)) {
    return values
  } else {
    return []
  }
}

const getValues = (parameters, field) => {
  const values = parameters[field]
  return toArray(values)
}

export { toggleSelection, getLabel, useParametersEffect, getValues, toArray }

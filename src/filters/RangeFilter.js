import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Chip,
  makeStyles,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core'
import { getValues as getValuesAsArray } from '../utilities'

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(1)
  },
  slider: {
    width: 400,
    paddingTop: '30px'
  },
  preset: {
    margin: theme.spacing(0, 1)
  }
}))

const defaultLabels = {
  confirm: 'Confirm',
  cancel: 'Cancel',
  selectAll: 'All',
  selectNone: 'None',
  and: 'and',
  any: 'Any',
  infinity: '∞'
}

const getValueIndicator = (parameters, field, labels) => {
  const values = getValuesAsArray(parameters, field)
  let start = findValue(values, '>')
  let end = findValue(values, '<')
  if (start === undefined && end === undefined) {
    return labels.any
  } else if (end === undefined) {
    return `> ${start}`
  } else if (start === undefined) {
    return `< ${end}`
  } else {
    return `> ${start} ${labels.and} < ${end}`
  }
}

const valueLabel = (value, unlimitedBoundaries, min, max, labels) => {
  if (unlimitedBoundaries && value === min) {
    return `-${labels.infinity}`
  } else if (unlimitedBoundaries && value === max) {
    return `${labels.infinity}`
  } else {
    return value
  }
}

const getValues = (parameters, field, unlimitedBoundaries, min, max) => {
  const values = getValuesAsArray(parameters, field)
  let start = findValue(values, '>')
  if (start === undefined) {
    start = min
  }
  let end = findValue(values, '<')
  if (end === undefined) {
    end = max
  }
  return [start, end]
}

const findValue = (values, operator) => {
  let value = values.find((v) => v.toString().startsWith(operator))
  if (value !== undefined) {
    try {
      value = parseInt(value.substring(1))
    } catch (error) {
      console.error(error)
    }
  }
  return value
}

const getSelected = (values, presets) => {
  return presets.filter((p) => {
    return p.value[0] >= values[0] && p.value[1] <= values[1]
  })
}

const RangeFilter = ({
  name,
  field,
  parameters,
  onParametersChanged,
  labels,
  min,
  max,
  unlimitedBoundaries,
  valueLabelFormat,
  presets,
  presetsOnly,
  ...rest
}) => {
  const componentLabels = { ...defaultLabels, ...labels }
  const classes = useStyles()

  const [state, setState] = useState({
    open: false,
    selectedPresets: [],
    value: []
  })
  const setOpen = (open) => {
    setState({ ...state, open })
  }
  const setValue = (value) => {
    setState({ ...state, value })
  }
  const { open, value, selectedPresets } = state
  const setSelected = (selectedPreset, multiple) => {
    const newSelectedPresets = multiple
      ? [...selectedPresets, selectedPreset]
      : [selectedPreset]
    const minSelected = newSelectedPresets
      .map((p) => p.value[0])
      .reduce((p, a) => Math.min(p, a), Number.MAX_VALUE)
    const maxSelected = newSelectedPresets
      .map((p) => p.value[1])
      .reduce((p, a) => Math.max(p, a), Number.MIN_VALUE)
    setState({
      ...state,
      value: [minSelected, maxSelected],
      selectedPresets: newSelectedPresets
    })
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const valueIndicator = getValueIndicator(parameters, field, componentLabels)
  useEffect(() => {
    const values = getValues(parameters, field, unlimitedBoundaries, min, max)
    const selected = getSelected(values, presets)
    setState({ ...state, value: values, selectedPresets: selected })
  }, [])

  const getPresetColor = (
    preset,
    selected,
    notSelectedColor,
    selectedColor
  ) => {
    const isSelected = selected.find((p) => p.id === preset.id) !== undefined
    return isSelected ? selectedColor : notSelectedColor
  }

  return parameters[field] !== undefined ? (
    <Fragment>
      <Chip
        className={classes.chip}
        label={
          <div>
            {name}: {valueIndicator}
          </div>
        }
        onDelete={() => {
          onParametersChanged({ [field]: undefined })
        }}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent>
          {!presetsOnly && (
            <div className={classes.slider}>
              <Slider
                min={min}
                max={max}
                {...rest}
                valueLabelFormat={(value) => {
                  return valueLabelFormat(
                    value,
                    unlimitedBoundaries,
                    min,
                    max,
                    componentLabels
                  )
                }}
                value={value}
                valueLabelDisplay='auto'
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            {presets.map((p) => {
              return (
                <Button
                  key={p.value.join(',')}
                  className={classes.preset}
                  variant='contained'
                  color={getPresetColor(
                    p,
                    selectedPresets,
                    'primary',
                    'secondary'
                  )}
                  onClick={(event) => {
                    const multiple = event.ctrlKey || event.shiftKey
                    setSelected(p, multiple)
                  }}
                >
                  {p.label}
                </Button>
              )
            })}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            {componentLabels.cancel}
          </Button>
          <Button
            onClick={() => {
              setOpen(false)
              const [start, end] = value
              let newParameter = {}
              if (unlimitedBoundaries) {
                if (start === min && end !== max) {
                  newParameter = { [field]: [`<${end}`] }
                } else if (start !== min && end === max) {
                  newParameter = { [field]: [`>${start}`] }
                } else if (start === min && end === max) {
                  newParameter = { [field]: null }
                } else {
                  newParameter = { [field]: [`>${start}`, `<${end}`] }
                }
              } else {
                newParameter = { [field]: [`>${start}`, `<${end}`] }
              }
              onParametersChanged(newParameter)
            }}
            color='secondary'
            autoFocus
          >
            {componentLabels.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  ) : (
    <></>
  )
}

RangeFilter.propTypes = {
  name: PropTypes.string.isRequired,
  labels: PropTypes.object,
  field: PropTypes.string.isRequired,
  parameters: PropTypes.object,
  onParametersChanged: PropTypes.func.isRequired,
  step: PropTypes.number,
  defaultValue: PropTypes.number,
  marks: PropTypes.arrayOf(PropTypes.object),
  valueLabelFormat: PropTypes.func,
  unlimitedBoundaries: PropTypes.bool,
  presets: PropTypes.arrayOf(PropTypes.object),
  presetsOnly: PropTypes.bool
}

RangeFilter.defaultProps = {
  labels: {},
  parameters: {},
  step: 100,
  defaultValue: 500,
  min: 0,
  max: 1000,
  marks: [],
  valueLabelFormat: valueLabel,
  unlimitedBoundaries: false,
  presetsOnly: false,
  presets: []
}

export default RangeFilter

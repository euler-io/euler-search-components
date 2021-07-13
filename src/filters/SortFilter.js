import React, { useState, memo } from 'react'
;<Divider />
import {
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Divider,
  InputLabel,
  FormControl,
  IconButton
} from '@material-ui/core'
import PropTypes from 'prop-types'
import SortIcon from '@material-ui/icons/Sort'
import RemoveIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles((theme) => ({
  sortBy: {
    margin: theme.spacing(2, 0)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

const defaultLabels = {
  sortBy: 'Sort By',
  sortByField: 'Field',
  direction: 'Direction',
  confirm: 'Confirm',
  cancel: 'Cancel'
}

const getValue = (values, field, parameters) => {
  let value = parameters[field]
  if (value === undefined) {
    value = values.length > 0 ? values[0].value : null
  }
  return value
}

const getLabel = (values, field, parameters) => {
  const value = parameters[field]
  if (value) {
    const e = values.find((v) => v.value == value)
    if (e) {
      return e.label
    }
  }
  return null
}

const SortFilter = ({
  labels,
  parameters,
  field,
  directionField,
  values,
  directions,
  onParametersChanged,
  defaultLabel
}) => {
  const componentLabels = { ...defaultLabels, ...labels }
  const classes = useStyles()
  const [state, setState] = useState({
    open: false,
    value: null,
    direction: null
  })

  const { open, value, direction } = state
  const setOpen = (open) => {
    setState({ ...state, open })
  }

  const openDialog = () => {
    const direction = getValue(directions, directionField, parameters)
    const value = getValue(values, field, parameters)
    setState({ ...state, open: true, value, direction })
  }

  return (
    <div className={classes.sortBy}>
      <Button size='small' onClick={(evt) => openDialog()}>
        <SortIcon />
        {componentLabels.sortBy}
        {(parameters[field] || defaultLabel) && ':'}
      </Button>
      {parameters[field] ? (
        <React.Fragment>
          <span>
            {getLabel(values, field, parameters)}{' '}
            {getLabel(directions, directionField, parameters)}
          </span>
          <IconButton
            aria-label='delete'
            size='small'
            onClick={(evt) => {
              onParametersChanged({
                [field]: undefined,
                [directionField]: undefined
              })
            }}
          >
            <RemoveIcon />
          </IconButton>
        </React.Fragment>
      ) : (
        <span>{defaultLabel}</span>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{componentLabels.sortBy}</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id='sort-by-label'>
              {componentLabels.sortByField}
            </InputLabel>
            <Select
              labelId='sort-by-label'
              id='sort-by-select'
              name='field'
              value={value}
              onChange={(evt) =>
                setState({ ...state, [evt.target.name]: evt.target.value })
              }
            >
              {values.map((v) => {
                return (
                  <MenuItem key={v.value} value={v.value}>
                    {v.label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id='sort-direction-label'>
              {componentLabels.direction}
            </InputLabel>
            <Select
              labelId='sort-direction-label'
              id='sort-direction-select'
              name='direction'
              value={direction}
              onChange={(evt) =>
                setState({ ...state, [evt.target.name]: evt.target.value })
              }
            >
              {directions.map((d) => {
                return (
                  <MenuItem key={d.value} value={d.value}>
                    {d.label}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            {componentLabels.cancel}
          </Button>
          <Button
            onClick={() => {
              onParametersChanged({
                [field]: value,
                [directionField]: direction
              })
              setOpen(false)
            }}
            color='secondary'
            autoFocus
          >
            {componentLabels.confirm}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

SortFilter.propTypes = {
  labels: PropTypes.object,
  field: PropTypes.string,
  directionField: PropTypes.string,
  parameters: PropTypes.object,
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
  directions: PropTypes.arrayOf(PropTypes.object),
  onParametersChanged: PropTypes.func.isRequired,
  defaultLabel: PropTypes.string
}

SortFilter.defaultProps = {
  parameters: {},
  field: 'sort_by',
  directionField: 'sort_direction',
  directions: [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' }
  ],
  defaultLabel: null
}

export default SortFilter

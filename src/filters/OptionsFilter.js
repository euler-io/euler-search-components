import React, { useState, Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  DialogActions,
  Divider,
  FormControlLabel
} from '@material-ui/core'
import { toggleSelection, getLabel, getValues } from '../utilities'
import { withStyles } from '@material-ui/core/styles'

const _getValueIndicator = (values, options) => {
  if (values.length === 0 || (values.length === 1 && values[0] === '')) {
    return 'Any'
  } else if (values.length < 3) {
    return values.map((v) => getLabel(v, options)).join(', ')
  } else if (values.length >= 3) {
    return (
      values
        .slice(0, 2)
        .map((v) => getLabel(v, options))
        .join(', ') + '...'
    )
  } else {
    return values
  }
}

const defaultLabels = {
  confirm: 'Confirm',
  cancel: 'Cancel',
  selectAll: 'All',
  selectNone: 'None'
}

const styles = (theme) => ({
  chip: { margin: theme.spacing(1) }
})

const OptionsFilter = (props) => {
  const {
    classes,
    name,
    field,
    options,
    parameters,
    getValueIndicator,
    onParametersChanged,
    labels
  } = props
  const values = getValues(parameters, field)
  const valueIndicator = getValueIndicator(values, options)

  const [state, setState] = useState({ open: false, selected: [] })
  const setOpen = (open) => {
    setState({ ...state, open })
  }
  const setSelected = (selected) => {
    setState({ ...state, selected })
  }
  const { open, selected } = state

  useEffect(() => {
    setSelected(values)
  }, [])

  const allSelected = selected.length === options.length

  const componentLabels = { ...defaultLabels, ...labels }
  return parameters[field] !== undefined ? (
    <Fragment>
      <Chip
        className={classes.chip}
        label={`${name}: ${valueIndicator}`}
        onDelete={() => {
          onParametersChanged({ [field]: undefined })
          setSelected([])
        }}
        onClick={() => setOpen(true)}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent>
          <FormControlLabel
            onClick={(evt) => {
              if (allSelected) {
                setSelected([])
              } else {
                setSelected(options.map((o) => o.value))
              }
            }}
            control={
              <Checkbox checked={allSelected} tabIndex={-1} disableRipple />
            }
            label={
              allSelected
                ? componentLabels.selectNone
                : componentLabels.selectAll
            }
          />
          <Divider />
          <List>
            {options.map((opt) => {
              const checked = selected.indexOf(opt.value) !== -1
              return (
                <ListItem
                  key={opt.value}
                  role={undefined}
                  dense
                  button
                  onClick={(evt) => {
                    setSelected(toggleSelection(opt.value, selected))
                  }}
                >
                  <Checkbox checked={checked} tabIndex={-1} disableRipple />
                  <ListItemText primary={opt.label} />
                </ListItem>
              )
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            {componentLabels.cancel}
          </Button>
          <Button
            onClick={() => {
              const selectedOpts = selected.filter((s) => s !== '').sort()
              onParametersChanged({
                [field]: selectedOpts.length ? selectedOpts : null
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
    </Fragment>
  ) : (
    <></>
  )
}

OptionsFilter.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  onParametersChanged: PropTypes.func.isRequired,
  getValueIndicator: PropTypes.func,
  parameters: PropTypes.object,
  labels: PropTypes.object
}

OptionsFilter.defaultProps = {
  parameters: {},
  getValueIndicator: _getValueIndicator,
  options: [],
  labels: defaultLabels
}

export default withStyles(styles)(OptionsFilter)

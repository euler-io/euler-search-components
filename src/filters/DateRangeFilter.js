import React, { useState, useEffect, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core'
const styles = (theme) => ({})
import { KeyboardDatePicker } from '@material-ui/pickers'

const defaultLabels = {
  confirm: 'Confirm',
  cancel: 'Cancel',
  anyDate: 'Any'
}

const DateRangeFilter = (props) => {
  const { parameters, name, field, onParametersChanged, labels, format } = props

  const [state, setState] = useState({
    open: false,
    inital: new Date(),
    final: new Date()
  })
  const setOpen = (open) => {
    setState({ ...state, open })
  }
  const setInitial = (initial) => {
    setState({ ...state, initial })
  }
  const setFinal = (final) => {
    setState({ ...state, final })
  }
  const { open, initial, final } = state

  const componentLabels = { ...defaultLabels, ...labels }
  const label = `${name}: ${componentLabels.anyDate}`

  return parameters[field] !== undefined ? (
    <Fragment>
      <Chip
        label={label}
        onDelete={() => {
          const filter = {}
          filter[field] = undefined
          onParametersChanged(filter)
        }}
        onClick={() => setOpen(true)}
      ></Chip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent>
          <KeyboardDatePicker
            placeholder={format}
            value={initial}
            onChange={(date) => setInitial(date)}
            format={format}
          />
          <KeyboardDatePicker
            placeholder={format}
            value={final}
            onChange={(date) => setFinal(date)}
            format={format}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            {componentLabels.cancel}
          </Button>
          <Button
            onClick={() => {
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

DateRangeFilter.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  parameters: PropTypes.object,
  onParametersChanged: PropTypes.func.isRequired,
  labels: PropTypes.object,
  format: PropTypes.string.isRequired
}

DateRangeFilter.defaultProps = {
  parameters: {},
  labels: defaultLabels,
  format: 'yyyy/MM/dd'
}

export default withStyles(styles)(DateRangeFilter)

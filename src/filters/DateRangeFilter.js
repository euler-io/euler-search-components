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
import { getValues } from '../utilities'
import { KeyboardDatePicker, useUtils } from '@material-ui/pickers'

const styles = (theme) => ({
  date: {
    margin: '0 auto',
    padding: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(0, 1, 0, 0)
  }
})

const defaultLabels = {
  confirm: 'Confirm',
  cancel: 'Cancel',
  anyDate: 'Any',
  start: 'Start',
  end: 'End'
}

const INITIAL_REGEX = new RegExp('^>(\\d+)$')
const FINAL_REGEX = new RegExp('^<(\\d+)$')

const parseDateRangeParameters = (values) => {
  if (values !== null) {
    const initial = Math.min(
      ...values
        .map((v) => {
          return INITIAL_REGEX.exec(v)
        })
        .filter((m) => m !== null && m !== undefined)
        .map((m) => {
          return parseInt(m[1])
        })
    )

    const final = Math.max(
      ...values
        .map((v) => {
          return FINAL_REGEX.exec(v)
        })
        .filter((m) => m !== null && m !== undefined)
        .map((m) => {
          return parseInt(m[1])
        })
    )

    return {
      initial:
        initial !== undefined && initial !== Infinity
          ? new Date(initial)
          : null,
      final: final !== undefined && final !== -Infinity ? new Date(final) : null
    }
  } else {
    return { initial: null, final: null }
  }
}

const DateRangeFilter = (props) => {
  const {
    parameters,
    name,
    field,
    onParametersChanged,
    labels,
    format,
    classes,
    disableFuture
  } = props

  const values = getValues(parameters, field)
  const parsedValues = parseDateRangeParameters(values)

  const [state, setState] = useState({
    open: false,
    initial: null,
    final: null
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

  const handleOnParametersChanged = (initialDate, finalDate) => {
    const dates = initialDate || finalDate ? [] : null
    if (initialDate) {
      dates.push(`>${initialDate.getTime()}`)
    }
    if (finalDate) {
      dates.push(`<${finalDate.getTime()}`)
    }
    onParametersChanged({ [field]: dates })
  }

  const updateState = (_parameters, _field, _state) => {
    const _values = getValues(_parameters, _field)
    const _parsedValues = parseDateRangeParameters(_values)
    setState({ ..._state, ..._parsedValues })
  }

  const openDialog = () => {
    updateState(parameters, field, { ...state, open: true })
  }

  useEffect(() => {
    updateState(parameters, field, state)
  }, [])

  const componentLabels = { ...defaultLabels, ...labels }
  const label = `${name}: ${componentLabels.anyDate}`

  const utils = useUtils()

  return parameters[field] !== undefined ? (
    <Fragment>
      {!parsedValues.initial && !parsedValues.final && (
        <Chip
          label={label}
          onDelete={() => {
            onParametersChanged({ [field]: undefined })
          }}
          onClick={openDialog}
        />
      )}
      {parsedValues.initial && (
        <Chip
          className={parsedValues.final ? classes.chip : null}
          label={`${name} ${componentLabels.start}: ${utils.format(
            utils.date(parsedValues.initial),
            format
          )}`}
          onDelete={() => {
            handleOnParametersChanged(null, final)
          }}
          onClick={openDialog}
        />
      )}
      {parsedValues.final && (
        <Chip
          label={`${name} ${componentLabels.end}: ${utils.format(
            utils.date(parsedValues.final),
            format
          )}`}
          onDelete={() => {
            handleOnParametersChanged(initial, null)
          }}
          onClick={openDialog}
        />
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{name}</DialogTitle>
        <DialogContent>
          <div className={classes.date}>
            <KeyboardDatePicker
              placeholder={format}
              value={initial}
              onChange={(date) => {
                setInitial(date ? new Date(date.unix() * 1000) : null)
              }}
              format={format}
              disableFuture={disableFuture}
              clearable
              label={componentLabels.start}
            />
          </div>
          <div className={classes.date}>
            <KeyboardDatePicker
              placeholder={format}
              value={final}
              onChange={(date) => {
                setFinal(date ? new Date(date.unix() * 1000) : null)
              }}
              format={format}
              disableFuture={disableFuture}
              clearable
              label={componentLabels.end}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            {componentLabels.cancel}
          </Button>
          <Button
            onClick={() => {
              handleOnParametersChanged(initial, final)
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
  format: PropTypes.string.isRequired,
  disableFuture: PropTypes.bool.isRequired
}

DateRangeFilter.defaultProps = {
  parameters: {},
  labels: defaultLabels,
  format: 'yyyy/MM/DD',
  disableFuture: true
}

export default withStyles(styles)(DateRangeFilter)
export { parseDateRangeParameters }

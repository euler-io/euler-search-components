import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Divider,
  makeStyles
} from '@material-ui/core'
import { toggleSelection, getLabel, getValues } from '../utilities'

const useStyles = makeStyles((theme) => ({}))

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

const AutoCompleteOptionsFilter = ({
  parameters,
  field,
  name,
  options,
  getValueIndicator,
  onParametersChanged
}) => {
  const classes = useStyles()
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

  return parameters[field] !== undefined ? (
    <Fragment>
      <Chip
        className={classes.chip}
        label={`${name}: ${valueIndicator}`}
        onDelete={() => {
          onParametersChanged({ [field]: undefined })
          setSelected([])
        }}
      />
    </Fragment>
  ) : (
    <></>
  )
}

AutoCompleteOptionsFilter.propTypes = {
  name: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object),
  onParametersChanged: PropTypes.func.isRequired,
  parameters: PropTypes.object,
  labels: PropTypes.object,
  getValueIndicator: PropTypes.func
}

AutoCompleteOptionsFilter.defaultProps = {
  parameters: {},
  options: [],
  getValueIndicator: _getValueIndicator,
  labels: defaultLabels
}

export default AutoCompleteOptionsFilter

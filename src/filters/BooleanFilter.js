import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Switch, Chip, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  chip: { margin: theme.spacing(1) }
}))

const defaultLabels = {}

const boolRegex = /^\s*(true|1|on|yes|sim)\s*$/i
const strToBool = (v) => {
  return v !== undefined && boolRegex.test(v)
}

const BooleanFilter = ({ name, field, parameters, onParametersChanged }) => {
  const classes = useStyles()
  const value = strToBool(parameters[field])
  return parameters[field] !== undefined ? (
    <Fragment>
      <Chip
        className={classes.chip}
        label={
          <div>
            {name}:
            <Switch
              checked={value}
              onChange={(evt) =>
                onParametersChanged({ [field]: evt.target.checked.valueOf() })
              }
            />
          </div>
        }
        onDelete={() => {
          onParametersChanged({ [field]: undefined })
        }}
      />
    </Fragment>
  ) : (
    <></>
  )
}

BooleanFilter.propTypes = {
  name: PropTypes.string.isRequired,
  labels: PropTypes.object,
  field: PropTypes.string.isRequired,
  parameters: PropTypes.object,
  onParametersChanged: PropTypes.func.isRequired
}

BooleanFilter.defaultProps = {
  labels: {},
  parameters: {}
}

export default BooleanFilter

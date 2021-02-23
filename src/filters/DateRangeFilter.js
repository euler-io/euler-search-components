import React, { useState, useEffect, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Chip } from '@material-ui/core'
const styles = (theme) => ({})

const DateRangeFilter = (props) => {
  const { parameters, field, onParametersChanged } = props
  return parameters[field] !== undefined ? (
    <Fragment>
      <Chip 
        onDelete={() => {
          const filter = {}
          filter[field] = undefined
          onParametersChanged(filter)
        }}
      >
        {parameters[field]}
      </Chip>
    </Fragment>
  ) : (
    <></>
  )
}

DateRangeFilter.propTypes = {
  field: PropTypes.string.isRequired,
  parameters: PropTypes.object,
  onParametersChanged: PropTypes.func.isRequired
}

DateRangeFilter.defaultProps = {
  parameters: {}
}

export default withStyles(styles)(DateRangeFilter)

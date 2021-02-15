import React from 'react'
import { Paper, TablePagination } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const styles = (theme) => ({
  pagination: {
    display: 'flex'
  },
  left: {
    justifyContent: 'flex-start'
  },
  center: {
    justifyContent: 'center'
  },
  right: {
    justifyContent: 'flex-end'
  }
})

const ResultsPagination = ({
  parameters,
  pageParameter,
  defaultPage,
  defaultRowsPerPage,
  rowsPerPageParameter,
  onParametersChanged,
  classes,
  position,
  ...rest
}) => {
  const page = parameters[pageParameter]
    ? parseInt(parameters[pageParameter])
    : 0
  const rowsPerPage = parameters[rowsPerPageParameter]
    ? parseInt(parameters[rowsPerPageParameter])
    : defaultRowsPerPage
  return (
    <div className={[classes.pagination, classes[position]].join(' ')}>
      <Paper elevation={1}>
        <TablePagination
          component='div'
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={(evt, page) => {
            const newParameters = {}
            newParameters[pageParameter] = page
            onParametersChanged(newParameters)
          }}
          onChangeRowsPerPage={(evt) => {
            const newParameters = {}
            newParameters[rowsPerPageParameter] = evt.target.value
            onParametersChanged(newParameters)
          }}
          {...rest}
        />
      </Paper>
    </div>
  )
}
ResultsPagination.propTypes = {
  pageParameter: PropTypes.string,
  defaultPage: PropTypes.number,
  rowsPerPageParameter: PropTypes.string,
  defaultRowsPerPage: PropTypes.number,
  parameters: PropTypes.object.isRequired,
  onParametersChanged: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['left', 'center', 'right'])
}

ResultsPagination.defaultProps = {
  pageParameter: 'page',
  defaultRowsPerPage: 10,
  rowsPerPageParameter: 'rowsPerPage',
  position: 'center'
}

export default withStyles(styles)(ResultsPagination)

import React, { useState, Fragment } from 'react'
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
  DialogActions
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const _getValueIndicator = (values) => {
  if (values === '') {
    return 'Any'
  }
  return values
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
    confirmLabel,
    cancelLabel
  } = props
  const values = parameters[field]
  const valueIndicator = getValueIndicator(values)
  const [open, setOpen] = useState(false)

  return values !== undefined ? (
    <Fragment>
      <Chip
        className={classes.chip}
        label={`${name}: ${valueIndicator}`}
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
          <List>
            {options.map((opt) => {
              return (
                <ListItem
                  key={opt.value}
                  role={undefined}
                  dense
                  button
                  onClick={(evt) => console.info('click')}
                >
                  <Checkbox checked={false} tabIndex={-1} disableRipple />
                  <ListItemText primary={opt.title} />
                </ListItem>
              )
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color='primary'>
            {cancelLabel}
          </Button>
          <Button
            onClick={() => console.info('confirm')}
            color='secondary'
            autoFocus
          >
            {confirmLabel}
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
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string
}

OptionsFilter.defaultProps = {
  parameters: {},
  getValueIndicator: _getValueIndicator,
  options: [],
  cancelLabel: 'Cancel',
  confirmLabel: 'Confirm'
}

export default withStyles(styles)(OptionsFilter)

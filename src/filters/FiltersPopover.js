import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Popover,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  addFilters: {
    margin: theme.spacing(2, 0)
  },
  filterPopover: {
    margin: theme.spacing(2)
  }
})

const FiltersPopover = (props) => {
  const { classes, label, filters, onParametersChanged } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const id = open ? 'add-filter-anchor' : undefined
  return (
    <div className={classes.addFilters}>
      <Button
        aria-describedby={id}
        size='small'
        onClick={(evt) => setAnchorEl(evt.currentTarget)}
      >
        <AddIcon />
        {label}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <div className={classes.filterPopover}>
          <Typography variant='h6'>{label}</Typography>
          <Divider />
          <List>
            {filters.map((f) => {
              const { field, name, icon } = f
              return (
                <ListItem
                  key={field}
                  button
                  onClick={() => {
                    const filter = {}
                    filter[field] = null
                    onParametersChanged(filter)
                    setAnchorEl(null)
                  }}
                >
                  {icon && icon}
                  <ListItemText primary={name} />
                </ListItem>
              )
            })}
          </List>
        </div>
      </Popover>
    </div>
  )
}

FiltersPopover.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  label: PropTypes.string,
  onParametersChanged: PropTypes.func.isRequired
}

FiltersPopover.defaultProps = {
  label: 'Add Filter',
  filters: []
}

export default withStyles(styles)(FiltersPopover)

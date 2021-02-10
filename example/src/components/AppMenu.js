import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'

const ListItemLink = (props) => {
  return <ListItem component={Link} {...props} />
}

const EulerAppMenuItem = (props) => {
  const { link, title, icon } = props
  return (
    <ListItemLink button to={link}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={title} />
    </ListItemLink>
  )
}

const AppMenu = (props) => {
  return (
    <List>
      <ListItemLink button to='/wikipedia'>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary='Wikipedia Search' />
      </ListItemLink>
    </List>
  )
}

export default AppMenu

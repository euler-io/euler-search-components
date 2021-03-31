import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Link } from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import MetadataIcon from '@material-ui/icons/DataUsageSharp'
import TextIcon from '@material-ui/icons/TextFields'
import ImageIcon from '@material-ui/icons/Portrait'

const ListItemLink = (props) => {
  return <ListItem component={Link} {...props} />
}

const AppMenu = (props) => {
  return (
    <List>
      <ListItemLink button to='/archiveorg'>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary='Archive.org Search' />
      </ListItemLink>
      <ListItemLink button to='/detail/text'>
        <ListItemIcon>
          <TextIcon />
        </ListItemIcon>
        <ListItemText primary='Text Detail' />
      </ListItemLink>
      <ListItemLink button to='/detail/metadata'>
        <ListItemIcon>
          <MetadataIcon />
        </ListItemIcon>
        <ListItemText primary='Metadata Detail' />
      </ListItemLink>
      <ListItemLink button to='/detail/image'>
        <ListItemIcon>
          <ImageIcon />
        </ListItemIcon>
        <ListItemText primary='Image Detail' />
      </ListItemLink>
    </List>
  )
}

export default AppMenu

import React from 'react'
import { Paper, Link, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  result: {
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(2),
    cursor: 'pointer'
  },
  title: {
    '& > p': {
      fontSize: '1.2rem'
    }
  },
  description: {
    '& > p': {
      fontSize: '1rem'
    }
  }
})

const LinkResult = ({ to, children }) => {
  return <Link href={to}>{children}</Link>
}

const SimpleResult = (props) => {
  const { title, description, link, classes, linkComponent } = props
  const LinkComponent = linkComponent
  return (
    <Paper className={classes.result} elevation={1}>
      <LinkComponent to={link}>
        <Typography className={classes.title} component='div'>
          <p>{title}</p>
        </Typography>
        <Typography className={classes.description} component='div'>
          <p>{description}</p>
        </Typography>
      </LinkComponent>
    </Paper>
  )
}

SimpleResult.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  index: PropTypes.number,
  linkComponent: PropTypes.elementType
}

SimpleResult.defaultProps = {
  linkComponent: LinkResult
}

export default withStyles(styles)(SimpleResult)

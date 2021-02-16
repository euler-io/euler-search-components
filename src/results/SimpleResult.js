import React from 'react'
import { Paper, Link, Typography, colors } from '@material-ui/core'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  result: {
    padding: theme.spacing(1, 2),
    marginBottom: theme.spacing(2),
    cursor: 'pointer'
  },
  text: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  title: {
    '& > p': {
      fontSize: '1.2rem',
      color: colors.blue[800],
      marginBottom: 0,
      marginTop: 0
    }
  },
  link: {
    '& > p': {
      fontSize: '0.8rem',
      color: colors.green[800],
      marginTop: 0
    }
  },
  description: {
    '& > p': {
      fontSize: '1rem',
      color: colors.grey[800],
      marginTop: 0
    }
  },
  linkComponent: {
    display: 'flex',
    justifyContent: 'flex-start',
    textDecoration: 'none !important',
    '&:hover $title p, &:hover $link p': {
      textDecoration: 'underline'
    }
  },
  thumbnail: {
    marginRight: theme.spacing(2)
  }
})

const LinkResult = ({ to, children, ...rest }) => {
  return (
    <Link href={to} {...rest}>
      {children}
    </Link>
  )
}

const SimpleText = ({ text, ...rest }) => {
  return (
    <Typography {...rest} component='div'>
      <p>{text}</p>
    </Typography>
  )
}

SimpleText.propTypes = {
  text: PropTypes.string.isRequired
}

SimpleText.defaultProps = {}

const DescriptionText = ({ text, classes }) => {
  return <SimpleText text={text} className={classes.description} />
}

const SimpleResult = (props) => {
  const {
    title,
    description,
    link,
    thumbnail,
    thumbnailText,
    classes,
    linkComponent,
    descriptionComponent
  } = props
  const LinkComponent = linkComponent
  const DescriptionComponent = descriptionComponent
  return (
    <Paper className={classes.result} elevation={1}>
      <LinkComponent to={link} className={classes.linkComponent}>
        {thumbnail && (
          <div className={classes.thumbnail}>
            <img src={thumbnail} alt={thumbnailText} />
          </div>
        )}
        <div>
          <Typography className={classes.title} component='div'>
            <p>{title}</p>
          </Typography>
          <Typography className={classes.link} component='div'>
            <p>{link}</p>
          </Typography>
          <DescriptionComponent text={description} />
        </div>
      </LinkComponent>
    </Paper>
  )
}

SimpleResult.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.string,
  thumbnailText: PropTypes.string,
  link: PropTypes.string,
  index: PropTypes.number,
  linkComponent: PropTypes.elementType,
  descriptionComponent: PropTypes.elementType
}

SimpleResult.defaultProps = {
  linkComponent: LinkResult,
  descriptionComponent: withStyles(styles)(DescriptionText)
}

export default withStyles(styles)(SimpleResult)

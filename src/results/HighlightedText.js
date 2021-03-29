import React from 'react'
import PropTypes from 'prop-types'
import dompurify from 'dompurify'
import _ from 'lodash'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  highlighted: {
    '& em': {
      backgroundColor: 'yellow',
      fontWeight: 'bold'
    }
  }
})

const HighlightedText = (props) => {
  const { allowedTags, classes } = props
  const html = {
    __html: dompurify.sanitize(props.children, { ALLOWED_TAGS: allowedTags })
  }
  const newProps = _.omit(
    { ...props },
    'children',
    'classes',
    'component',
    'allowedTags'
  )

  const className = `${classes.highlighted} ${
    props.className ? props.className : ''
  }`.trim()

  if (props.component) {
    const Component = props.component
    return (
      <Component
        dangerouslySetInnerHTML={html}
        {...newProps}
        className={className}
      />
    )
  } else {
    return (
      <span
        dangerouslySetInnerHTML={html}
        {...newProps}
        className={className}
      />
    )
  }
}

HighlightedText.propTypes = {
  allowedTags: PropTypes.arrayOf(PropTypes.string),
  component: PropTypes.elementType
}

HighlightedText.defaultProps = {
  allowedTags: ['em']
}

export default withStyles(styles)(HighlightedText)

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const styles = (theme) => ({
  searchResults: {
    margin: theme.spacing(2, 'auto')
  }
})

const _getItemElement = (r) => {
  return <>{r}</>
}

const _decodeItem = (r) => {
  return r
}

const ResultsList = (props) => {
  const { results, classes, getItemElement, decodeItem } = props
  return (
    <div className={classes.searchResults}>
      {results.map((r) => {
        const ResultElement = getItemElement(r)
        const item = decodeItem(r)
        return <ResultElement key={r.id} result={item} />
      })}
    </div>
  )
}

ResultsList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  getItemElement: PropTypes.func,
  decodeItem: PropTypes.func
}

ResultsList.defaultProps = {
  results: [],
  getItemElement: _getItemElement,
  decodeItem: _decodeItem
}

export default withStyles(styles)(ResultsList)

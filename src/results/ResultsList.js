import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SimpleResult from './SimpleResult'

const styles = (theme) => ({
  searchResults: {
    margin: theme.spacing(2, 'auto')
  }
})

const _getItemElement = (r) => {
  return SimpleResult
}

const _decodeItem = (r) => {
  return r
}

const _encodeResults = (results) => {
  return results
}

const ResultsList = (props) => {
  const { classes, results, getItemElement, decodeItem, encodeResults } = props
  return (
    <div className={classes.searchResults}>
      {encodeResults(results).map((r) => {
        const ResultElement = getItemElement(r)
        const item = decodeItem(r)
        return <ResultElement {...item} />
      })}
    </div>
  )
}

ResultsList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  getItemElement: PropTypes.func,
  decodeItem: PropTypes.func,
  encodeResults: PropTypes.func
}

ResultsList.defaultProps = {
  results: [],
  getItemElement: _getItemElement,
  decodeItem: _decodeItem,
  encodeResults: _encodeResults
}

export default withStyles(styles)(ResultsList)

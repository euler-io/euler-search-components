import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import SimpleResult from './SimpleResult'

const styles = (theme) => ({
  searchResults: {
    margin: theme.spacing(2, 'auto')
  }
})

const _ResultComponents = (r) => {
  return SimpleResult
}

const _decodeItem = (r) => {
  return r
}

const _encodeResults = (results) => {
  return results
}

const ResultsList = (props) => {
  const { classes, results, resultComponents, decodeItem, encodeResults } = props
  return (
    <div className={classes.searchResults}>
      {encodeResults(results).map((r) => {
        const item = decodeItem(r)
        const ResultComponent = resultComponents(item)
        return <ResultComponent key={item.key} {...item} />
      })}
    </div>
  )
}

ResultsList.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  resultComponents: PropTypes.func,
  decodeItem: PropTypes.func,
  encodeResults: PropTypes.func
}

ResultsList.defaultProps = {
  results: [],
  resultComponents: _ResultComponents,
  decodeItem: _decodeItem,
  encodeResults: _encodeResults
}

export default withStyles(styles)(ResultsList)

import React from 'react'
import { Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const _getFormattedText = (query, total, took) => {
  return `${total} results for '${query}' found in ${took}ms.`
}

const ResultStatistics = (props) => {
  const { query, total, took, getFormattedText } = props
  const text = getFormattedText(query, total, took)
  return <Typography color='textSecondary'>{text}</Typography>
}

ResultStatistics.propTypes = {
  query: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  took: PropTypes.number.isRequired,
  getFormattedText: PropTypes.func
}

ResultStatistics.defaultProps = {
  getFormattedText: _getFormattedText
}

export default ResultStatistics

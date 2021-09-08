import React from 'react'
import ResultsList from '../results/ResultsList'

const ResultsModes = {
  list: ResultsList
}

const NotFoundResultMode = ({ type }) => {
  return <div>The result mode {type} has not been created yet.</div>
}

export { ResultsModes }
export default (mode) => {
  const { type } = mode
  if (type === undefined) {
    // type not defined
    return ResultsList
  } else if (typeof ResultsModes[type] !== 'undefined') {
    // component does exist
    return ResultsModes[type]
  } else {
    // component doesn't exist yet
    return NotFoundResultMode
  }
}

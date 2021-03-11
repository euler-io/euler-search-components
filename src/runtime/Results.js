import React from 'react'
import SimpleResult from '../results/SimpleResult'

const Results = {
  simple: SimpleResult
}

const NotFoundResult = (props) => {
  return <div>The result {props.type} has not been created yet.</div>
}

export default (result) => {
  const { type } = result
  if (type !== undefined) {
    // type not defined
    return SimpleResult
  } else if (typeof Results[type] !== 'undefined') {
    // component does exist
    return Results[type]
  } else {
    // component doesn't exist yet
    return NotFoundResult
  }
}

import React from 'react'
import invariant from 'tiny-invariant'
import { RouterContext } from 'react-router'
import QueryState from './QueryState'

function withQueryState(Component) {
  const displayName = `withQueryState(${
    Component.displayName || Component.name
  })`

  const C = (props) => {
    const { wrappedComponentRef, ...remainingProps } = props

    return (
      <RouterContext.Consumer>
        {(context) => {
          invariant(
            context,
            `You should not use <${displayName} /> outside a <Router>`
          )
          const { history, location } = context
          const queryState = new QueryState(history, location)
          return (
            <Component
              {...remainingProps}
              {...context}
              queryState={queryState}
              ref={wrappedComponentRef}
            />
          )
        }}
      </RouterContext.Consumer>
    )
  }
  C.displayName = displayName
  C.WrappedComponent = Component
  return C
}

export default withQueryState

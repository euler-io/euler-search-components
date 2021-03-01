import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

const DefaultText = (props) => {
  return <p>{props.text}</p>
}

const _decodeItem = (i) => {
  return i
}

const styles = (theme) => ({})

const TextViewer = (props) => {
  const { items, textEl, decodeItem, loadMoreEnabled, onLoadMore } = props
  const El = textEl

  const loader = useRef(null)

  useEffect(() => {
    var options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    }
    const observer = new IntersectionObserver(onLoadMore, options)
    if (loader.current) {
      observer.observe(loader.current)
    }
  }, [])

  return (
    <div>
      {items.map((i) => {
        const decoded = decodeItem(i)
        return <El key={decoded.key} {...decoded} />
      })}

      {loadMoreEnabled && (
        <div className='loading' ref={loader}>
          <h2>Load More</h2>
        </div>
      )}
    </div>
  )
}

TextViewer.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadMoreEnabled: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired,
  decodeItem: PropTypes.func,
  textEl: PropTypes.elementType
}

TextViewer.defaultProps = {
  textEl: DefaultText,
  decodeItem: _decodeItem,
  loadMoreEnabled: true
}

export default withStyles(styles)(TextViewer)

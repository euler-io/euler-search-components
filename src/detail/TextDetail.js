import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import HighlightedText from '../results/HighlightedText'
import InfiniteScroll from 'react-infinite-scroll-component'

const styles = (theme) => ({
  fragments: {
    '& *': {
      marginTop: 0,
      marginBottom: 0
    }
  }
})

const TextComponent = ({ children }) => {
  return <HighlightedText component='p'>{children}</HighlightedText>
}

const defaultTextDecode = (text) => {
  return text
}

const TextDetail = ({
  classes,
  component,
  textDecode,
  fragments,
  hasMoreFragments,
  onLoadMore
}) => {
  const Component = component
  return (
    <div>
      <div className={classes.fragments}>
        <InfiniteScroll
          next={onLoadMore}
          dataLength={fragments.length}
          hasMore={hasMoreFragments}
        >
          {fragments.map((frag) => {
            const text = textDecode(frag.text)
            return <Component key={frag.id}>{text}</Component>
          })}
        </InfiniteScroll>
      </div>
    </div>
  )
}

TextDetail.propTypes = {
  component: PropTypes.elementType,
  textDecode: PropTypes.func,
  fragments: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.any, text: PropTypes.string })
  ),
  hasMoreFragments: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired
}

TextDetail.defaultProps = {
  component: TextComponent,
  textDecode: defaultTextDecode,
  fragments: [],
  hasMoreFragments: false
}

export default withStyles(styles)(TextDetail)

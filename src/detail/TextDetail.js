import React from 'react'
import { withStyles, Paper } from '@material-ui/core'
import PropTypes from 'prop-types'
import HighlightedText from '../results/HighlightedText'
import InfiniteScroll from 'react-infinite-scroll-component'

const styles = (theme) => ({
  fragments: {
    margin: theme.spacing(2, 2),
    padding: theme.spacing(2, 2),
    '& *': {
      marginTop: 0,
      marginBottom: 0
    }
  }
})

const TextComponent = ({ children }) => {
  return <HighlightedText component='p'>{children}</HighlightedText>
}

const defaultFragmentDecode = (frag) => {
  return frag
}

const TextDetail = ({
  classes,
  component,
  fragmentDecode,
  fragments,
  hasMoreFragments,
  onLoadMore
}) => {
  const Component = component
  return (
    <Paper>
      <div className={classes.fragments}>
        <InfiniteScroll
          next={onLoadMore}
          dataLength={fragments.length}
          hasMore={hasMoreFragments}
        >
          {fragments.map((frag) => {
            frag = fragmentDecode(frag)
            return <Component key={frag.id}>{frag.text}</Component>
          })}
        </InfiniteScroll>
      </div>
    </Paper>
  )
}

TextDetail.propTypes = {
  component: PropTypes.elementType,
  fragmentDecode: PropTypes.func,
  fragments: PropTypes.arrayOf(PropTypes.object),
  hasMoreFragments: PropTypes.bool,
  onLoadMore: PropTypes.func.isRequired
}

TextDetail.defaultProps = {
  component: TextComponent,
  fragmentDecode: defaultFragmentDecode,
  fragments: [],
  hasMoreFragments: false
}

export default withStyles(styles)(TextDetail)

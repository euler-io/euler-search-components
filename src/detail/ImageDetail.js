import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

const styles = (theme) => ({
  image: {
    display: 'block',
    margin: theme.spacing(4, 'auto')
  }
})

const ImageComponent = ({ image, className }) => {
  return <img className={className} src={image.url} />
}

const defaultImageDecode = (image) => {
  return image
}

const ImageDetail = ({
  classes,
  component,
  images,
  imageDecode,
  onLoadMore,
  hasMoreImages
}) => {
  const Component = component
  if (onLoadMore === undefined) {
    onLoadMore = () => {}
  }
  return (
    <div>
      <InfiniteScroll
        next={onLoadMore}
        dataLength={images.length}
        hasMore={hasMoreImages}
      >
        {images.map((img) => {
          img = imageDecode(img)
          return (
            <Component className={classes.image} key={img.id} image={img} />
          )
        })}
      </InfiniteScroll>
    </div>
  )
}

ImageDetail.propTypes = {
  component: PropTypes.elementType,
  images: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.any, url: PropTypes.string })
  ),
  imageDecode: PropTypes.func,
  hasMoreImages: PropTypes.bool,
  onLoadMore: PropTypes.func
}

ImageDetail.defaultProps = {
  component: ImageComponent,
  images: [],
  imageDecode: defaultImageDecode,
  hasMoreImages: false
}

export default withStyles(styles)(ImageDetail)

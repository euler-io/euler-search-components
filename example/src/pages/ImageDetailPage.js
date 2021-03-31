import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { ImageDetail } from 'euler-search-components'
import create from 'zustand'
import axios from 'axios'
import qs from 'querystring'

const styles = (theme) => ({})

const API_URL = 'https://archive.org/advancedsearch.php'

const useStore = create((set) => ({
  images: [],
  total: 0,
  page: 0,
  loadImages: (page = 1) => {
    const query = 'mediatype:(image)'
    const params = {
      'fl[]': ['identifier'],
      rows: 10,
      output: 'json',
      q: query,
      page: page + 1
    }
    axios
      .get(`${API_URL}?${qs.stringify(params)}`)
      .then((response) => {
        const results = response.data.response.docs
        const total = response.data.response.numFound
        set((state) => ({
          images: [...state.images, ...results],
          total,
          page: page + 1
        }))
      })
      .catch((e) => {
        console.info('error', e)
      })
  }
}))

const ImageDetailPage = (props) => {
  const { images, loadImages, page, total } = useStore()
  useEffect(() => {
    loadImages()
  }, [loadImages])
  return (
    <ImageDetail
      images={images}
      onLoadMore={() => loadImages(page)}
      hasMoreImages={images.length < total}
      imageDecode={(i) => {
        return {
          id: i.identifier,
          url: `https://archive.org/services/img/${i.identifier}`
        }
      }}
    />
  )
}

export default withStyles(styles)(ImageDetailPage)

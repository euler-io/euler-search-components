import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { TextDetail } from 'euler-search-components'
import { LoremIpsum } from 'lorem-ipsum'
import create from 'zustand'
import _ from 'lodash'

const lorem = new LoremIpsum()

const styles = (theme) => ({})

const generateParagraphs = (num, initialId = 0) => {
  let id = initialId
  return _.range(num).map(() => {
    id += 1
    return {
      id: id,
      text: lorem.generateParagraphs(1)
    }
  })
}

const useStore = create((set) => ({
  fragments: generateParagraphs(30),
  loadMore: (num, initialId = 0) => {
    const newFragments = generateParagraphs(num, initialId)
    set((state) => ({
      fragments: [...state.fragments, ...newFragments]
    }))
  }
}))

const TextDetailPage = (props) => {
  const { fragments, loadMore } = useStore()
  return (
    <TextDetail
      fragments={fragments}
      onLoadMore={() => loadMore(5, fragments.length)}
      hasMoreFragments={fragments.length < 200}
    />
  )
}

export default withStyles(styles)(TextDetailPage)

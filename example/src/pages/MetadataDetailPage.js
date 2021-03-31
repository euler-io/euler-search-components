import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { MetadataDetail } from 'euler-search-components'
import { LoremIpsum } from 'lorem-ipsum'
import create from 'zustand'
import _ from 'lodash'

const lorem = new LoremIpsum()

const styles = (theme) => ({})

const generateMetadata = (num) => {
  return _.range(num).map(() => {
    return {
      name: lorem.generateWords(2),
      value: lorem.generateSentences(1)
    }
  })
}

const generateSections = (num, numMeta = 5) => {
  return _.range(num).map(() => {
    return {
      title: lorem.generateWords(2),
      metadata: generateMetadata(numMeta)
    }
  })
}

const useStore = create((set) => ({
  metadata: generateMetadata(5),
  sections: generateSections(5)
}))

const MetadataDetailPage = (props) => {
  const { metadata, sections } = useStore()
  return <MetadataDetail sections={sections} metadata={metadata} />
}

export default withStyles(styles)(MetadataDetailPage)

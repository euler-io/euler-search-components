import React, { useEffect } from 'react'
import { TextViewer } from 'euler-search-components'
import create from 'zustand'
import { LoremIpsum } from 'lorem-ipsum'
import { MD5 } from 'crypto-js'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

const useStore = create((set) => ({
  items: [],
  loadMore: () => {
    set((state) => {
      const { items } = state
      if (items.length < 200) {
        const newItems = loadItems()
        return { items: [...items, ...newItems] }
      }
    })
  }
}))

const loadItems = () => {
  return [...Array(20).keys()].map((i) => {
    const text = lorem.generateParagraphs(1)
    return {
      key: MD5(new Date() + text),
      text
    }
  })
}

const TextViewerDemo = (props) => {
  const { items, loadMore } = useStore()
  useEffect(() => {
    loadMore()
  }, [])

  return (
    <div>
      <TextViewer
        items={items}
        onLoadMore={loadMore}
        loadMoreEnabled={items.length < 200}
      ></TextViewer>
    </div>
  )
}

export default TextViewerDemo

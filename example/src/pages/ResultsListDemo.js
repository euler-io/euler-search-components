import React from 'react'
import { LiveProvider, LivePreview, LiveEditor, LiveError } from 'react-live'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { withStyles } from '@material-ui/core/styles'
import { ResultsList } from 'euler-search-components'

const results = [
  {
    id: 1,
    title: 'Briony Dragoslava',
    description: 'Briony Dragoslava is a 27 years old student from Germany.'
  },
  {
    id: 2,
    title: 'Briony Dragoslava',
    description: 'Briony Dragoslava is 27 years old...'
  }
]
const scope = { results, ResultsList }

const code = `
  <ResultsList results={results}>
  </ResultsList>
`

const ResultsListDemo = (props) => {
  return (
    <div>
      <LiveProvider code={code} scope={scope}>
        <LiveEditor disabled={true} />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </div>
  )
}

export default ResultsListDemo

import React from 'react'
import PropTypes from 'prop-types'
import HighlightedText from '../results/HighlightedText'
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles((theme) => ({
  metadata: {
    margin: theme.spacing(2, 2),
    padding: theme.spacing(2, 2)
  }
}))

const ValueComponent = ({ children }) => {
  return <HighlightedText component='span'>{children}</HighlightedText>
}

const defaultMetadataDecode = (m) => {
  return m
}

const defaultSectionDecode = (s) => {
  return s
}

const MetadataList = ({ metadata, metadataDecode }) => {
  const classes = useStyles()
  return (
    <Paper>
      <div className={classes.metadata}>
        <List>
          {metadata.map((md, idx) => {
            md = metadataDecode(md)
            const id = `${md.name}-${idx}`
            return (
              <ListItem key={id}>
                <ListItemText
                  primary={md.name}
                  secondary={<ValueComponent>{md.value}</ValueComponent>}
                />
              </ListItem>
            )
          })}
        </List>
      </div>
    </Paper>
  )
}

const MetadataDetail = ({
  metadata,
  sections,
  metadataDecode,
  sectionDecode
}) => {
  return (
    <div>
      <MetadataList metadata={metadata} metadataDecode={metadataDecode} />
      {sections.map((s, idx) => {
        s = sectionDecode(s)
        const id = `${s.title}-${idx}`
        return (
          <Accordion id={id} defaultExpanded={idx == 0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${id}-content`}
              id={`panel-${id}-header`}
            >
              {s.title}
            </AccordionSummary>
            <AccordionDetails>
              <MetadataList
                metadata={s.metadata}
                metadataDecode={metadataDecode}
              />
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div>
  )
}

const metadataShape = PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.string
})

MetadataDetail.propTypes = {
  metadata: PropTypes.arrayOf(metadataShape),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      metadata: PropTypes.arrayOf(metadataShape)
    })
  ),
  metadataDecode: PropTypes.func,
  sectionDecode: PropTypes.func
}

MetadataDetail.defaultProps = {
  metadata: [],
  sections: [],
  metadataDecode: defaultMetadataDecode,
  sectionDecode: defaultSectionDecode
}

export default MetadataDetail

import { parseDateRangeParameters, toArray } from 'euler-search-components'
import axios from 'axios'
import qs from 'querystring'

const search = {
  title: 'Archive.org Search',
  fields: ['search', 'mediaType', 'page', 'rows', 'date'],
  mode: {
    type: 'list'
  },
  filters: [
    {
      type: 'text',
      field: 'search'
    },
    {
      type: 'popover',
      filters: [
        {
          type: 'options-dialog',
          name: 'Media Type',
          field: 'mediaType',
          options: [
            { value: 'account', label: 'Account' },
            { value: 'audio', label: 'Audio' },
            { value: 'data', label: 'Data' },
            { value: 'image', label: 'Image' },
            { value: 'movies', label: 'Movies' },
            { value: 'text', label: 'Texts' },
            { value: 'web', label: 'Web' }
          ]
        },
        {
          type: 'date-range-dialog',
          field: 'date',
          name: 'Date'
        },
        {
          type: 'boolean',
          field: 'boolean',
          name: 'Boolean Filter'
        },
        {
          type: 'range',
          field: 'size',
          name: 'Range Filter',
          unlimitedBoundaries: true,
          min:0,
          max:8000000,
          step:1000,
          presetsOnly:true,
          presets:[
            {
              id: 'small',
              label: 'Small',
              value: [0, 50000]
            },
            {
              id: 'medium',
              label: 'Medium',
              value: [50000, 350000]
            },
            {
              id: 'big',
              label: 'Big',
              value: [350000, 8000000]
            }
          ]
        }
      ]
    },
    {
      type: 'sort',
      field: 'sort_by',
      values: [{ value: 'created_datetime', label: 'Created Date' }]
    }
  ]
}

const searchArchiveOrg = (parameters) => {
  const { search, mediaType, page, rows, date } = parameters
  const API_URL = 'https://archive.org/advancedsearch.php'
  let query = search
  if (mediaType && Array.isArray(mediaType) && mediaType.length > 0) {
    query += ` AND mediatype:(${mediaType.join(' OR ')})`
  } else if (mediaType) {
    query += ` AND mediatype:(${mediaType})`
  }
  if (date && date.length > 0) {
    const dateValues = toArray(date)
    const parsedDates = parseDateRangeParameters(dateValues)
    let initial = null
    let final = null
    if (parsedDates.initial === null) {
      initial = new Date(1900, 1, 1, 0, 0, 0)
    } else {
      initial = new Date(parsedDates.initial)
    }
    if (parsedDates.final === null) {
      final = new Date()
    } else {
      final = new Date(parsedDates.final)
    }
    const initialStr = `${initial.getFullYear()}-${initial.getMonth()}-${initial.getDay()}`
    const finalStr = `${final.getFullYear()}-${final.getMonth()}-${final.getDay()}`
    query += ` AND date:[${initialStr} TO ${finalStr}]`
  }
  const params = {
    'fl[]': ['title', 'description', 'identifier'],
    rows: rows ? parseInt(rows) : 10,
    output: 'json',
    q: query,
    page: page ? parseInt(page) + 1 : 1
  }
  return axios.get(`${API_URL}?${qs.stringify(params)}`)
}

export default search
export { searchArchiveOrg }

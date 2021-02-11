import qs from 'querystring'

class QueryState {
  constructor(history, location) {
    this.history = history
    this.location = location
  }

  getParameters = (defaultParameters = {}) => {
    const params = {
      ...defaultParameters,
      ...qs.parse(this.location.search.replace('?', ''))
    }
    return params
  }

  updateQuery = (params) => {
    const oldParams = this.getParameters()
    params = {
      ...oldParams,
      ...params
    }
    if (oldParams !== params) {
      const newPath = this.buildPath(params, this.location.pathname)
      this.history.push(newPath)
    }
  }

  buildPath = (params, pathname) => {
    const search = qs.stringify(params)
    return `${pathname}?${search}`
  }
}

export default QueryState

import qs from 'qs'

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

  updateQuery = (params, filterFn) => {
    const oldParams = this.getParameters()
    params = {
      ...oldParams,
      ...params
    }
    if (oldParams !== params) {
      const newPath = this.buildPath(params, this.location.pathname, filterFn)
      this.history.push(newPath)
    }
  }

  buildPath = (params, pathname, filterFn) => {
    const search = qs.stringify(params, {
      indices: false,
      strictNullHandling: true
    })
    return `${pathname}?${search}`
  }
}

export default QueryState

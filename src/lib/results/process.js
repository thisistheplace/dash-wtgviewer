import * as chroma from 'chroma-js'

import { makeScale } from './colorscale'
import * as ResultPropTypes from './../proptypes/results'

const processResults = (results) => {
  if (!results.element_results){return {}}
  // check for limits
  var min = Infinity
  var max = -Infinity
  if (results.limits){
    if (results.limits.min && results.limits.max){
      min = results.limits.min
      max = results.limits.max
    }
  } else {
    // get range in results
    results.element_results.map(elementResult => {
      elementResult.results.map(result => {
        min = Math.min(min, result.value)
        max = Math.max(max, result.value)
      })
    })
  }

  const scale = makeScale(min, max)

  // generate hash table of results with colors attached
  // key is the target element id
  const output = {}
  results.element_results.map(elementResult => {
    const newResults = []
    elementResult.results.map(result => {
      result.color = scale(result.value).toString()
      newResults.push(result)
    })
    output[elementResult.target] = newResults
  })
  return output
}

processResults.propTypes = ResultPropTypes.Results

export {processResults}
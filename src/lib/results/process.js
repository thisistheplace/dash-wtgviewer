import { makeScale } from './colorscale'
import * as ResultPropTypes from './../proptypes/results'

const processResults = (results) => {
  if (!results.element_results){return {}}
  // check for limits
  var min = Infinity
  var max = -Infinity
  // get range in results
  results.element_results.map(elementResult => {
    elementResult.results.map(result => {
      min = Math.min(min, result.value)
      max = Math.max(max, result.value)
    })
  })
  // Overwrite limits
  if (results.limits){
    if (results.limits.min){
      min = results.limits.min
    }
    if (results.limits.max){
      max = results.limits.max
    }
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
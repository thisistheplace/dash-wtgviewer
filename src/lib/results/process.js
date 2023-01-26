import * as ResultPropTypes from './../proptypes/results'
import { frac2color } from "./contours";

const processResults = (results) => {
  if (!results.element_results){return {}}
  // get range in results
  var min = Infinity
  var max = -Infinity
  results.element_results.map(elementResult => {
    elementResult.results.map(result => {
      min = Math.min(min, result.value)
      max = Math.max(max, result.value)
    })
  })

  // generate hash table of results with colors attached
  // key is the target element id
  const output = {}
  results.element_results.map(elementResult => {
    const newResults = []
    elementResult.results.map(result => {
      result.color = frac2color(result.value, min, max)
      newResults.push(result)
    })
    output[elementResult.target] = newResults
  })
  return output
}

processResults.propTypes = ResultPropTypes.Results

export {processResults}
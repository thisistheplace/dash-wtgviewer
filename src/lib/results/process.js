import * as chroma from 'chroma-js'

import * as ResultPropTypes from './../proptypes/results'

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
  const range = max - min
  const scale = chroma
    .scale(["blue", "green", "yellow", "red"])
    .domain([min, min + range / 3, min + 2 * range / 3, max])

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
import PropTypes from 'prop-types'
import React, {useRef, useEffect, useState} from 'react'
import * as chroma from 'chroma-js'

import * as ResultPropTypes from './../proptypes/results'

const ResultsColorScale = (props) => {
  const ref = useRef()
  const [results, setResults] = useState(null)
  const [colors, setColors] = useState([])
  // const [scale, ]
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1)
  const [number, setNumber] = useState(props.number)

  useEffect(()=>{
    if (!props.max){return}
    setMax(props.max)
  }, [props.max])

  useEffect(()=>{
    if (!props.min){return}
    setMin(props.min)
  }, [props.min])

  useEffect(()=>{
    const newColors = []
    const inc = (max - min) / number
    const range = max - min
    var current = max
    const scale = chroma
      .scale(["blue", "green", "yellow", "red"])
      .domain([min, min + range / 3, min + 2 * range / 3, max])

    while (newColors.length < number){
      newColors.push(
        scale(current).toString()
      )
      current -= inc
    }
    setColors(newColors)
    setNumber(props.number)
  }, [min, max, props.number])

  useEffect(()=>{
    if (!props.results || Object.keys(props.results).length === 0){
      setResults(null)
      return
    }
    // get range in results
    var min = Infinity
    var max = -Infinity
    props.results.element_results.map(elementResult => {
      elementResult.results.map(result => {
        min = Math.min(min, result.value)
        max = Math.max(max, result.value)
      })
    })
    setResults(props.results)
    setMin(min)
    setMax(max)
  }, [props.results])

  return (
    <div ref={ref}>
      {
        results ?
        <div className='colorscale-holder'>
          <div className='gradient'>
            <div className='colorscale-text-top'>{max.toExponential(2).toString()}</div>
            <div className='colorscale-text-middle'>{((max + min)/2).toExponential(2).toString()}</div>
            <div className='colorscale-text-bottom'>{min.toExponential(2).toString()}</div>
            {
              colors.map((thisColor, i) =>
                <li
                  key={i}
                  className="grad-step"
                  style={{backgroundColor: thisColor, listStyle: "none", height: 100 / number + "%"}}
                />
              )
            }
          </div>
        </div>
        : null
      }
    </div>
  )

}

ResultsColorScale.defaultProps = {
  number: 1000
}

ResultsColorScale.propTypes = {
  results: ResultPropTypes.Results,
  number: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
}

export { ResultsColorScale }
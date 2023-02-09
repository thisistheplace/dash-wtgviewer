import React, {useRef, useEffect, useState} from 'react'
import * as chroma from 'chroma-js'

import * as ResultPropTypes from './../proptypes/results'

const EXTREMES = "#ADADAD"

type ResultsColorScaleProps = {
  results: ResultPropTypes.Results,
  number: number,
  limits: ResultPropTypes.Limits,
  clicked: Function
}

const makeScale = (min: number, max: number) => {
  const range = max - min
  return chroma
    .scale([EXTREMES, EXTREMES, "blue", "yellow", "red", EXTREMES, EXTREMES])
    .domain([min - range, min - range / 1000, min, min + range / 2, max, max + range / 1000, max + range])
}

const ResultsColorScale = (props: ResultsColorScaleProps) => {
  const ref = useRef()
  const [results, setResults] = useState(null)
  const [colors, setColors] = useState([])
  // const [scale, ]
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(1)
  const [number, setNumber] = useState(props.number)
  const [countClicked, setCountClicked] = useState(0)

  useEffect(()=>{
    props.clicked(countClicked)
  }, [countClicked])

  useEffect(()=>{
    if (!props.limits){return}
    if (!props.limits.min){return}
    setMin(props.limits.min)
    if (!props.limits.max){return}
    setMax(props.limits.max)
  }, [props.limits])

  useEffect(()=>{
    const scale = makeScale(min, max)

    const newColors = []
    const inc = (max - min) / number
    var current = max

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
          <div className='gradient' onClick={() => {setCountClicked(countClicked + 1)}}>
            <div className='colorscale-text-top'>{max.toExponential(2).toString()}</div>
            <div className='colorscale-text-middle'>{((max + min)/2).toExponential(2).toString()}</div>
            <div className='colorscale-text-bottom'>{min.toExponential(2).toString()}</div>
            <div style={{height: "100%"}}>
              {
                colors.map((thisColor, i) =>
                  <li
                    key={i}
                    className="grad-step"
                    style={{
                      backgroundColor: thisColor,
                      listStyle: "none",
                      height: 100 / number + "%"
                    }}
                  />
                )
              }
            </div>
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

export { ResultsColorScale, makeScale }
import React, {useRef, useState, useEffect} from 'react'

import * as ModelPropTypes from './../proptypes/model'
import * as ResultPropTypes from './../proptypes/results'
import { Cylinder } from './../geometry/cylinder'

const DEFAULT_COLOR = "#ADADAD"

const defaultResults = (elementSet) => {
  const newResults = {}
  elementSet.elements.map(element => {
    newResults[element.id] = [DEFAULT_COLOR, DEFAULT_COLOR]
  })
  return newResults
}

function Tower(props){
  const ref = useRef()
  const [elements, setElements] = useState([])
  const [results, setResults] = useState({})

  useEffect(() => {
    if (!props.element_set) {return}
    setResults(defaultResults(props.element_set))
    setElements(props.element_set.elements)
  }, [props.element_set])

  useEffect(()=>{
    if (!props.element_set){return}
    if (!props.results || Object.keys(props.results).length === 0){
      setResults(defaultResults(props.element_set))
      return
    }
    const newResults = {}
    props.element_set.elements.map(element => {
      const elementResults = props.results[element.id]
      newResults[element.id] = [elementResults[0].color, elementResults[1].color]
    })
    setResults(newResults)
  }, [props.results])

  return (
    <group ref={ref} name={props.name}>
      {
        elements.map((elementData, i) =>
          <Cylinder
            key={i}
            {...elementData}
            callbacks={props.callbacks}
            colors={results[elementData.id]}
          />
        )
      }
    </group>
  )
}

Tower.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  results: ResultPropTypes.Results,
  ...ModelPropTypes.Tower.isRequired
}

export { Tower }
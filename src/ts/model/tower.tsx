import React, {useRef, useState, useEffect} from 'react'

import * as ModelPropTypes from './../proptypes/model'
import * as ResultPropTypes from './../proptypes/results'
import { Cylinder } from './../geometry/cylinder'

type TowerProps = {
  callbacks: ModelPropTypes.Callbacks,
  results: ResultPropTypes.Results,
  defaultColor: string
} & ModelPropTypes.Tower

function Tower(props: TowerProps){
  const ref = useRef()
  const [elements, setElements] = useState([])
  const [results, setResults] = useState({})

  useEffect(() => {
    if (!props.element_set) {return}
    setElements(props.element_set.elements)
  }, [props.element_set])

  useEffect(()=>{
    if (!props.element_set){return}
    if (!props.results || Object.keys(props.results).length === 0){
      setResults([])
      return
    }
    const newResults = {}
    props.element_set.elements.map(element => {
      const elementResults = props.results[element.id]
      newResults[element.id] = elementResults
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
            results={results[elementData.id]}
            defaultColor={props.defaultColor}
          />
        )
      }
    </group>
  )
}

Tower.defaultProps = {
  defaultColor: "#ADADAD"
}

export { Tower }
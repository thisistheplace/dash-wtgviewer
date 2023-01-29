import PropTypes from 'prop-types'
import React, {forwardRef, useState, useEffect} from 'react'
import {Rotor} from './rotor'
import {Nacelle} from './nacelle'
import {Tower} from './tower'
import {Foundation} from './foundation'
import * as ModelPropTypes from './../proptypes/model'
import * as ResultPropTypes from './../proptypes/results'
import { processResults } from '../results/process'

// TODO: should make cylinders instanced meshes with scaling / rotation etc

const Model = forwardRef((props, ref) => {

  const [results, setResults] = useState(null)

  useEffect(()=>{
    if (!props.results){
      setResults(null)
      return
    }
    if (Object.keys(props.results).length === 0){
      setResults(null)
      return
    }
    setResults(
      processResults(props.results)
    )
  }, [props.results])

  return (
    <group ref={ref} name={props.name} position={props.position}>
      <Rotor {...props.rotor} callbacks={props.callbacks}/>
      <Nacelle {...props.nacelle} callbacks={props.callbacks}/>
      <Tower {...props.tower} results={results} defaultColor={results ? "#adadad" : "#adadad"} callbacks={props.callbacks}/>
      <Foundation {...props.foundation} results={results} defaultColor={results ? "#adadad" : "#fdc407"} callbacks={props.callbacks}/>
    </group>
  )
})

Model.defaultProps = {
  position: [0, 0, 0]
}

Model.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  position: PropTypes.arrayOf(PropTypes.number),
  results: ResultPropTypes.Results,
  ...ModelPropTypes.Model
}

export {Model}
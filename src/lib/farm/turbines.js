import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect, createRef } from 'react'

import Model from '../model/model'
import * as ModelPropTypes from '../proptypes/model'

import { InstanceArray } from './array/array'
import { BladesArray } from './array/blades'

const TurbineModel = (props) => {
  const ref = useRef()
  const modelRef = createRef()
  const [combine, setCombine] = useState(true)

  useEffect(() => {
    // Rebuild instanced meshes
    setCombine(true)
  }, [props.model])

  return (
    <group ref={ref}>
      <Model ref={modelRef} {...props.model} />
      <InstanceArray name={"foundation"} color={"#fdc407"} modelRef={modelRef} positions={props.positions} visible={props.array} combine={combine} currentTurbine={props.currentTurbine}/>
      <InstanceArray name={"tower"} modelRef={modelRef} positions={props.positions} visible={props.array} combine={combine} currentTurbine={props.currentTurbine}/>
      <InstanceArray name={"nacelle"} modelRef={modelRef} positions={props.positions} visible={props.array} combine={combine} currentTurbine={props.currentTurbine}/>
      <BladesArray modelRef={modelRef} positions={props.positions} visible={props.array} combine={combine} currentTurbine={props.currentTurbine}/>
    </group>
  )
}

function areEqual(prevProps, nextProps){
  var areEqual = true
  Object.keys(prevProps).forEach(function(key){
    if (prevProps[key] !== nextProps[key]){
      if (key === "model"){
        Object.keys(prevProps.model).forEach(function(modelKey){
          if (prevProps.model[modelKey] !== nextProps.model[modelKey] && modelKey !== "callbacks"){
            areEqual = false
          }
        })
      } else {
        areEqual = false
      }
    }
  })
  return areEqual
}

TurbineModel.propTypes = {
  currentTurbine: PropTypes.number.isRequired,
  array: PropTypes.bool.isRequired,
  model: ModelPropTypes.Model.isRequired,
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number
    })
  )
}

// memo really helps with performance here!!!
// export default React.memo(TurbineModel, areEqual)
export default TurbineModel
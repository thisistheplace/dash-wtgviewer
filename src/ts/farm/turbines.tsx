import React, {useRef, useState, useEffect, createRef } from 'react'

import { Model } from '../model/model'
import * as ModelPropTypes from '../proptypes/model'
import * as ResultPropTypes from '../proptypes/results'

import { InstanceArray } from './array/instances'
import { BladesArray } from './array/blades'

type TurbinesProps = {
  currentTurbine: number,
  array: boolean,
  model: ModelPropTypes.Model,
  positions: {
    x: number,
    y: number
  }[]
}

const TurbineModel = (props: TurbinesProps) => {
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

export { TurbineModel }
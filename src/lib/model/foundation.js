import React, {useRef, useState, useEffect} from 'react'

import * as ModelPropTypes from './../proptypes/model'
import { Cylinder } from './../geometry/cylinder'
import {createBoxWithRoundedEdges} from './../geometry/box'

function Foundation(props){
  const ref = useRef()
  const [elements, setElements] = useState([])

  useEffect(() => {
    if (!props.element_set) {return}
    setElements(props.element_set.elements)
  }, [props.element_set])

  return (
    <group ref={ref} name={props.name}>
      {
        elements.map((elementData, i) =>{
          var element = null
          if (elementData.eltype === "cube"){
            element = <Cylinder
              key={i}
              {...elementData}
              callbacks={props.callbacks}
              color={"#fdc407"}
            />
          }
          else
          {
            element = <Cylinder
                key={i}
                {...elementData}
                callbacks={props.callbacks}
                color={"#fdc407"}
              />
          }
          return element
        })
      }
    </group>
  )
}

function areEqual(prevProps, nextProps){
  var areEqual = true
  Object.keys(prevProps).forEach(function(key){
    if (prevProps[key] !== nextProps[key] && key !== "callbacks"){
      areEqual = false
    }
  })
  return areEqual
}

Foundation.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  ...ModelPropTypes.Foundation.isRequired
}

// export default React.memo(Foundation, areEqual)
export default Foundation
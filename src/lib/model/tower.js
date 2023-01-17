import React, {useRef, useState, useEffect} from 'react'

import * as ModelPropTypes from './../proptypes/model'
import { Cylinder } from './../geometry/cylinder'

function Tower(props){
  const ref = useRef()
  const [elements, setElements] = useState([])

  useEffect(() => {
    if (!props.element_set) {return}
    setElements(props.element_set.elements)
  }, [props.element_set])

  return (
    <group ref={ref} name={props.name}>
      {
        elements.map((elementData, i) =>
          <Cylinder
            key={i}
            {...elementData}
            callbacks={props.callbacks}
          />
        )
      }
    </group>
  )
}


Tower.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  ...ModelPropTypes.Tower.isRequired
}

export {Tower}
import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'

import { Cylinder } from './../geometry/cylinder'

function Foundation(props){
  const ref = useRef()
  const [elements, setElements] = useState([])

  useEffect(() => {
    if (!props.element_set) {return}
    setElements(props.element_set.elements)
  }, [props.element_set])

  return (
    <group ref={ref}>
      {
        elements.map((elementData, i) =>
          <Cylinder
            key={i}
            {...elementData}
            parent={props.parent}
          />
        )
      }
    </group>
  )
}


Foundation.propTypes = {
  parent: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  element_set: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    elements: PropTypes.arrayOf(
        PropTypes.shape({
        id: PropTypes.number,
        eltype: PropTypes.string,
        nodes: PropTypes.arrayOf(
            PropTypes.shape({
            id: PropTypes.number,
            x: PropTypes.number,
            y: PropTypes.number,
            z: PropTypes.number
            })
        ),
        diameters: PropTypes.arrayOf(PropTypes.number),
        thicknesses: PropTypes.arrayOf(PropTypes.number)
        })
    )
  })
}

export {Foundation}
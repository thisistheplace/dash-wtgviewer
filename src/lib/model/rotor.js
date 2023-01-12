import PropTypes from 'prop-types'
import React, {useRef} from 'react'

import { Blades } from './blades'

const Rotor = (props) => {
  const ref = useRef()

  return (
    <group ref={ref}>
      <Blades {...props.blades} parent={props.parent}/>
    </group>
  )

}

Rotor.propTypes = {
  parent: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  blades: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
      url: PropTypes.string,
      node: PropTypes.shape({
        id: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number,
        z: PropTypes.number
      })
    })
  ),
  hub: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    cone: PropTypes.shape({
      id: PropTypes.number,
      eltype: PropTypes.string,
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          x: -PropTypes.number,
          y: PropTypes.number,
          z: PropTypes.number
        })
      ),
      diameter: PropTypes.number
    })
  }),
  node: PropTypes.shape({
    id: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  })
}

export {Rotor}
import PropTypes from 'prop-types'
import React, {useRef, useEffect} from 'react'
// import { useFrame } from '@react-three/fiber'

import { Blades } from './blades'
import { Hub } from './hub'

const Rotor = (props) => {
  const ref = useRef()

  useEffect(() => {
    if (!props.node) { return }
    ref.current.position.x = props.node.x
    ref.current.position.y = props.node.y
    ref.current.position.z = props.node.z
  }, [props])

  // useFrame(() => (ref.current.rotation.y += 0.01))

  return (
    <group ref={ref}>
      <Blades blades={props.blades} parent={props.parent}/>
      <Hub {...props.hub} parent={props.parent}/>
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
          x: PropTypes.number,
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
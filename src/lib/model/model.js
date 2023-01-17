import PropTypes from 'prop-types'
import React, {useRef} from 'react'
import { Rotor } from './rotor'
import { Nacelle } from './nacelle'
import { Tower } from './tower'
import { Foundation } from './foundation'

// TODO: should make cylinders instanced meshes with scaling / rotation etc
// TODO: merge buffer geometries to make wind farm
// TODO: add map

const Model = (props) => {
  const ref = useRef()

  return (
    <group ref={ref}>
      <Rotor {...props.rotor} parent={ref}/>
      <Nacelle {...props.nacelle} parent={ref}/>
      <Tower {...props.tower} parent={ref}/>
      <Foundation {...props.foundation} parent={ref}/>
    </group>
  )
}

Model.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  foundation: PropTypes.shape({
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
          diameter: PropTypes.number,
          thickness: PropTypes.number
        })
      )
    })
  }),
  tower: PropTypes.shape({
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
  }),
  nacelle: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    element: PropTypes.shape({
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
      width: PropTypes.number,
      height: PropTypes.number
    })
  }),
  rotor: PropTypes.shape({
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
        }),
        scale: PropTypes.shape({
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
  })
}

export { Model }
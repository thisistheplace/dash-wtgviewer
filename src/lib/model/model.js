import PropTypes from 'prop-types'
import React, {useRef} from 'react'
import * as THREE from 'three'
import {Cylinder, makeCylinder} from './../model/cylinder.js'
import {Cuboid} from './../model/cuboid.js'
import {Blades} from './../model/blades.js'

// TODO: should make cylinders instanced meshes with scaling / rotation etc

const Model = (props) => {
  const ref = useRef()

  return (
    <group ref={ref}>

    </group>
  )
}

// function to build model
function ModelBuilder(parent, tubulars, boxes, rotor_diameter, num_blades){
  const components = []
  // loop through tubular components
  tubulars.array.forEach(cylMember => {
    // extract data
    const pnt1 = new THREE.Vector3(cylMember.node1[0], cylMember.node1[1], cylMember.node1[2])
    const pnt2 = new THREE.Vector3(cylMember.node2[0], cylMember.node2[1], cylMember.node2[2])
    // Calculate geometry
    const cdata = makeCylinder(pnt1, pnt2)
    // Generate DOM
    var newCylinder = <Cylinder len={cdata[0]} pos={cdata[1]} orient={cdata[2]} radius1={cylMember.radius1} radius2={cylMember.radius2} cmpt_id={cylMember.number} cmpt_str={cylMember.cmpt_str} parent={parent}/>
    components.push(newCylinder)    
  })

  // loop through nacelle components
  boxes.array.forEach(boxMember => {
    var newCuboid = <Cuboid width={boxMember.width} height={boxMember.height} length={boxMember.length} node={boxMember.node} cmpt_id={boxMember.number} cmpt_str={boxMember.cmpt_str} parent={parent}/>
    components.push(newCuboid)
  })

  // create blade vectors
  const blade_data = []
  const blade_length = rotor_diameter / 2
  for (var i=0 i < num_blades i++){
    // create start and endpoints of blade
    const pnt1 = new THREE.Vector3(0., 0., 0.)
    const pnt2 = new THREE.Vector3(blade_length * Math.sin(i * 2 * Math.PI / num_blades), 0., blade_length * Math.cos(i * 2 * Math.PI / num_blades))
    // make blades
    const cdata = makeCylinder(pnt1, pnt2)
    blade_data.push(cdata)
  }

  // Make blade group (get blade position from box node)
  const rotor_pos = []
  const bladeOffset = -2
  rotor_pos[0] = boxes[0].node[0]
  rotor_pos[1] = bladeOffset + boxes[0].length / 2
  rotor_pos[2] = boxes[0].node[2]
  var blade_group = <Blades data={blade_data} pos={rotor_pos} radius1={0.05} radius2={1.0} num_blades={num_blades} parent={parent}/>
  components.push(blade_group)

  return components

}

export default ModelBuilder

Model.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  foundation: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    element_sets: PropTypes.arrayOf(
      PropTypes.shape({
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
                z: -PropTypes.number
              })
            ),
            diameter: PropTypes.number,
            thickness: PropTypes.number
          })
        )
      })
    )
  }),
  tower: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    element_sets: PropTypes.arrayOf(
      PropTypes.shape({
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
    )
  }),
  nacelle: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    element_sets: PropTypes.arrayOf(
      PropTypes.shape({
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
            width: PropTypes.number,
            height: PropTypes.number
          })
        )
      })
    )
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
  })
}
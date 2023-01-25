import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import * as THREE from 'three'

import * as ModelPropTypes from './../proptypes/model'
import { nodeDistance } from '../geometry/vectors'

const Box = (props) => {
  console.log(props)
  const ref = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [geometry, setGeometry] = useState(new THREE.BufferGeometry())
  const hoverOpacity = 0.8

  useEffect(() => {
    if (!ref.current) {return}
    const length = nodeDistance(props.nodes[0], props.nodes[1])

    // Pinched from here: https://discourse.threejs.org/t/round-edged-box/1402
    const shape = new THREE.Shape()
    const eps = 0.00001
    const radius0 = length / 10
    const radius = radius0 - eps
    shape.absarc( eps, eps, eps, -Math.PI / 2, -Math.PI, true )
    shape.absarc( eps, props.height -  radius * 2, eps, Math.PI, Math.PI / 2, true )
    shape.absarc( length - radius * 2, props.height -  radius * 2, eps, Math.PI / 2, 0, true )
    shape.absarc( length - radius * 2, eps, eps, 0, -Math.PI / 2, true )
    const geometry = new THREE.ExtrudeGeometry( shape, {
      amount: props.width - radius0 * 2,
      bevelEnabled: true,
      bevelSegments: props.smoothness,
      steps: 1,
      bevelSize: radius,
      bevelThickness: radius0,
      curveSegments: props.smoothness
    })
    geometry.center()
    setGeometry(geometry)

    // TODO: handle orientation!
    ref.current.position.x = props.nodes[0].x - length / 2
    ref.current.position.y = props.nodes[0].y
    ref.current.position.z = props.nodes[0].z
  }, [props.height, props.width, props.nodes, props.smoothness])
  
  return (
    <mesh
      ref={ref}
      geometry={geometry}
      castShadow={false}
      receiveShadow={false}
      onClick={() => setActive(!active)}
      onPointerOver={() => {
        setHover(true)
        props.callbacks.tooltip({text: "element: " + props.id, display: 'block'})
      }}
      onPointerOut={() => {
        setHover(false)
        props.callbacks.tooltip({text: "", display: 'none'})
      }}
    >
      <meshPhongMaterial
        opacity={hoverOpacity}
        color={hovered ? 'red' : props.color}
        transparent={false}
      />
    </mesh>
  )
}

Box.propTypes = {
  callbacks: ModelPropTypes.Callbacks,
  color: PropTypes.string,
  smoothness: PropTypes.number,
  ...ModelPropTypes.Element
}

export {Box}
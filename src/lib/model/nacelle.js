import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'

import {nodeDistance} from './../geometry/vectors'

function Nacelle(props){
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [length, setLength] = useState(0)
  const defaultColor = 0xadadad

  useEffect(() => {
    if (!props.element) {return}
    const distance = nodeDistance(props.element.nodes[0], props.element.nodes[1])
    setLength(distance)
    // TODO: handle orientation!
    mesh.current.position.x = props.element.nodes[0].x - distance / 2
    mesh.current.position.y = props.element.nodes[0].y
    mesh.current.position.z = props.element.nodes[0].z
  }, [props.element])

  return (
    <mesh
      ref={mesh}
      onClick={() => setActive(!active)}
      castShadow={true}
      receiveShadow={true}
      onPointerOver={() => {
          setHover(true)
          props.parent.setState({tooltip: {text: props.name, display: 'block'}})
      }}
      onPointerOut={() => {
          setHover(false)
          props.parent.setState({tooltip: {text: "", display: 'none'}})
      }}
    >
      <boxGeometry args={[length, props.element.width, props.element.height]}/>
      <meshPhongMaterial opacity={1.0} transparent={false} color={hovered ? 'red' : defaultColor} />
    </mesh>
  )
}


Nacelle.propTypes = {
  parent: PropTypes.any,
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
}

export {Nacelle}
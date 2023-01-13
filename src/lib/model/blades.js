import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import { useGLTF } from '@react-three/drei'

const Blade = (props) => {
  const mesh = useRef()
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const [geom, setGeom] = useState(null)
  const defaultColor = 0xadadad

  useEffect(() => {
    if (!props.url) { return }
    console.log("creating blade")
    console.log(props.url)
    const bladeModel = useGLTF(props.url)
    console.log(bladeModel)
    setGeom(bladeModel.scene.children[0].geometry)

    mesh.current.position.x = props.node.x
    mesh.current.position.y = props.node.y
    mesh.current.position.z = props.node.z
  }, [props])
  
  return (
    <mesh
      ref={mesh}
      geom={geom}
      castShadow={true}
      receiveShadow={true}
      onClick={() => setActive(!active)}
      onPointerOver={() => {
        setHover(true)
        props.parent.setState({tooltip: {text: props.name, display: 'block'}})
      }}
      onPointerOut={() => {
        setHover(false)
        props.parent.setState({tooltip: {text: "", display: 'none'}})
      }}
    >
      <meshPhongMaterial opacity={1.0} transparent={false} color={hovered ? 'red' : defaultColor} />
    </mesh>
  )
}

function Blades(props){
    const ref = useRef()
    const [blades, setBlades] = useState([])
    const [rotation, setRotation] = useState(0)

    useEffect(() => {
      if (!props.blades) { return }
      console.log("creating blades")
      setBlades(props.blades)
      setRotation(Math.PI * 2 / props.blades.length)
    }, [props.blades])
  
    return (
      <group ref={ref}>
        {
          blades.map((bladeData, i) =>
            <Blade key={i} {...bladeData} parent={props.parent} rotation={rotation}/>
          )
        }
      </group>
    )
  }

Blade.propTypes = {
  parent: PropTypes.any,
  name: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
  node: PropTypes.shape({
      id: PropTypes.number,
      x: PropTypes.number,
      y: PropTypes.number,
      z: PropTypes.number
  }),
  rotation: PropTypes.number
}

Blades.propTypes = {
  parent: PropTypes.any,
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
  )
}

export {Blade, Blades}
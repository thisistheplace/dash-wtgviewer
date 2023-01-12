import React, {useRef, useState, useEffect, setState} from 'react';
import {useFrame} from '@react-three/fiber';

function Blade(props){
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // useEffect to change mesh orientation on first render
  useEffect(() => {
    // Runs only on the first render
    // Define orientation
    mesh.current.applyMatrix4(props.orient)
    mesh.current.position.x = props.pos.x
    mesh.current.position.y = props.pos.y
    mesh.current.position.z = props.pos.z
    mesh.current.castShadow = true
    mesh.current.receiveShadow = true
  }, []);
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      ref={mesh}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => {
        setHover(true);
        props.parent.setState({tooltip: {text: props.cmpt_str, display: 'block'}});
      }}
      onPointerOut={(event) => {
        setHover(false);
        props.parent.setState({tooltip: {text: "", display: 'none'}});
    }}
    >
      <cylinderGeometry args={[props.radius1, props.radius2, props.len, 32, 1]}/>
      <meshPhongMaterial opacity={1.0} transparent={false} color={hovered ? 'red' : 0xadadad} />
    </mesh>
  )
}

function Blades(props){
    // This reference will give us direct access to the mesh
    const group = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // useEffect to change mesh orientation on first render
    useEffect(() => {
      // Runs only on the first render
      // Position correctly
      group.current.position.x = props.pos[0]
      group.current.position.y = props.pos[1]
      group.current.position.z = props.pos[2]
      group.current.castShadow = true
      group.current.receiveShadow = true
    }, []);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (group.current.rotation.y += 0.01))
  
    // create blades
    const blades = []
    for (var i=0; i < props.num_blades; i++){
      var data = props.data[i]
      const blade = <Blade len={data[0]} pos={data[1]} orient={data[2]} radius1={props.radius} radius2={props.radius2} cmpt_id={`Blade_${i + 1}`} parent={props.parent}/>
      blades.push(blade)
    }
  
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <group ref={group}>
          {blades}
      </group>
    )
  }

export {Blades};
import React, {useRef, useState, useEffect, setState} from 'react';

function Cuboid(props){
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // useEffect to change mesh orientation on first render
    useEffect(() => {
      // Position correctly
      mesh.current.position.x = props.node[0]
      mesh.current.position.y = props.node[1]
      mesh.current.position.z = props.node[2]
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
        <boxGeometry args={[props.width, props.length, props.height]}/>
        <meshPhongMaterial opacity={1.0} transparent={false} color={hovered ? 'red' : 0xadadad} />
      </mesh>
    )
  }
  
  export {Cuboid};
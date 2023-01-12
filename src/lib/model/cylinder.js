import React, {useRef, useState, useEffect} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {frac2hexcolor} from './../model/contours.js';
// import {ResultsContext, ContextBridge} from './../model/context_management.js';

// function to build tubulars
function MakeCylinder(pointX, pointY) {
  var direction = new THREE.Vector3().subVectors(pointY, pointX);
  var orientation = new THREE.Matrix4();
  orientation.lookAt(pointX, pointY, new THREE.Object3D().up);
  orientation.multiply(new THREE.Matrix4().set(1, 0, 0, 0,
      0, 0, 1, 0,
      0, -1, 0, 0,
      0, 0, 0, 1));
  var position = new THREE.Vector3(
      (pointY.x + pointX.x) / 2,
      (pointY.y + pointX.y) / 2,
      (pointY.z + pointX.z) / 2
  );
  return [direction.length(), position, orientation]
}

function Cylinder(props){
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // const results = ContextBridge(ResultsContext)
  // console.log(results)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // TODO: This is very inefficent...need to figure out how to react to parent.props changing!
  useFrame((state, delta) => (
    mesh.current.material.color.set(frac2hexcolor(props.parent.props.values[props.cmpt_id], props.parent.props.max, props.parent.props.min, props.parent.state.contours))
  ))
  // useEffect to change mesh orientation on first render
  useEffect(() => {
    // Runs only on the first render
    // update colour
    const col = frac2hexcolor(props.parent.props.values[props.cmpt_id], props.parent.props.max, props.parent.props.min, props.parent.state.contours)
    mesh.current.material.color.set(col)
    // Define orientation
    mesh.current.applyMatrix4(props.orient)
    // Position correctly
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
      onClick={(event) => {
        // Only the mesh closest to the camera will be processed
        event.stopPropagation()
        setActive(!active)
        if (active){
          props.parent.props.setProps({active_cmpt: props.cmpt_id})
        }
      }}
      onPointerOver={(event) => {
        // Only the mesh closest to the camera will be processed
        event.stopPropagation()
        props.parent.setState({mouse: {x: event.clientX, y: event.clientY}})
        setHover(true);
        var result_value = Intl.NumberFormat('en-GB', {notation: "engineering"}).format(props.parent.props.values[props.cmpt_id])
        props.parent.setState({tooltip: {text: props.cmpt_str, display: 'block'}, value: `Value: ${result_value}`});
      }}
      onPointerOut={(event) => {
        // Only the mesh closest to the camera will be processed
        event.stopPropagation()
        setHover(false);
        props.parent.setState({tooltip: {text: "", display: 'none'}, value: ""});
    }}
    >
      <cylinderGeometry args={[props.radius1, props.radius2, props.len, 32, 1]}/>
      <meshPhongMaterial
        opacity={hovered ? 0.8 : 1.0}
        transparent={false}
      />
    </mesh>
  )
}

export {Cylinder, MakeCylinder};
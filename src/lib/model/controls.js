import React, {useRef, useEffect} from 'react'
import {extend, useFrame, useThree} from '@react-three/fiber'
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls"
import * as THREE from 'three'

extend({TrackballControls})

const FOCUS = new THREE.Vector3(0, 0, 0)

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the TrackballControls component.
    // https://threejs.org/docs/#examples/en/controls/TrackballControls
    var {
      camera,
      gl: { domElement },
    } = useThree()
    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef()

    useEffect(() => {
      // initial camera position
      camera.position.x = 20
      camera.position.y = 10
      camera.position.z = 0
      camera.up.set(0, 0, 1)
      camera.lookAt(FOCUS)
      // initial controls setup
      controls.current.rotateSpeed = 2.5
      controls.current.zoomSpeed = 1.5
      controls.current.panSpeed = 1.5
      controls.current.noZoom = false
      controls.current.noPan = false
      controls.current.staticMoving = true
      controls.current.dynamicDampingFactor = 0.3
    }, [])

    useFrame(() => controls.current.update())
    
    return <trackballControls ref={controls} args={[camera, domElement]} />
  }

export {CameraControls}
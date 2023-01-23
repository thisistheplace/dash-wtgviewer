import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Water } from './water'

import * as THREE from 'three'

extend({THREE, Water})

const Ocean = (props) => {

  const ref = useRef()
  const [geom, setGeom] = useState(new THREE.BufferGeometry())
  const [options, setOptions] = useState({})

  useEffect(() => {
    if (!ref.current || !props.sunRef.current) {return}
    // Get geometry
    const waterGeometry = new THREE.PlaneBufferGeometry( props.size, props.size )
    // waterGeometry.rotateX(Math.PI / 2)
    
    setGeom(waterGeometry)

    const waterOptions = {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load( '/assets/img/waternormals.jpg', function ( texture ) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      } ),
      alpha: 0.9,
      sunDirection: props.sunRef.current.position.clone().normalize(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false
    }
    setOptions(waterOptions)
    // ref.current.material.uniforms.sunDirection.value.copy( props.sunRef.current.position ).normalize()
    console.log(ref.current)
  }, [])
    
  useFrame((state, delta) => {
    const timeFactor = 5
    ref.current.material.uniforms.time.value += delta / timeFactor
  })

  return (
    <water ref={ref} args={[geom, options]} />
  )
}

Ocean.propTypes = {
  sunRef: PropTypes.any.isRequired,
  size: PropTypes.number.isRequired
}

export {Ocean}
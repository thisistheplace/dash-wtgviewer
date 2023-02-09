import React, {useEffect, useRef, useState} from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { Water } from './water'

import * as THREE from 'three'

extend({THREE, Water})

type OceanProps = {
  sunRef: any,
  size: number
}

const Ocean = (props: OceanProps) => {

  const ref = useRef()
  const [geom, setGeom] = useState(new THREE.BufferGeometry())
  const [options, setOptions] = useState({})

  useEffect(() => {
    if (!ref.current || !props.sunRef.current) {return}
    // Get geometry
    const waterGeometry = new THREE.PlaneGeometry( props.size, props.size )
    
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
  }, [])
    
  useFrame((state, delta) => {
    const timeFactor = 5
    const mesh: Water = ref.current
    if (mesh){

      mesh.material.uniforms.time.value += delta / timeFactor
    }
  })

  return (
    <water ref={ref} args={[geom, options]} />
  )
}

export {Ocean}
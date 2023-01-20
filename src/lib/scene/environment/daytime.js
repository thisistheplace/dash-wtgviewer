import PropTypes from 'prop-types'
import React, {useEffect, useRef} from 'react'
import { extend } from '@react-three/fiber'
import { Sky } from 'three/examples/jsm/objects/Sky'

import * as THREE from 'three'

extend({THREE, Sky})

const Daytime = (props) => {

  const ref = useRef()

  useEffect(()=>{
    if (!ref.current || !props.sunRef.current) {return}
    var sun = props.sunRef.current
    var uniforms = ref.current.material.uniforms;
    uniforms.turbidity.value = 10
    uniforms.rayleigh.value = 0.5
    uniforms.mieCoefficient.value = 0.02
    uniforms.mieDirectionalG.value = 0.9
    var parameters = {
      distance: 5000,
      inclination: 0.1,
      azimuth: 0.5
    }
    var theta = Math.PI * ( parameters.inclination - 0.5 )
    var phi = 2 * Math.PI * ( parameters.azimuth - 0.5 )
    sun.position.x = -parameters.distance * Math.cos( phi )
    sun.position.y = parameters.distance * Math.sin( phi ) * Math.sin( theta )
    sun.position.z = -parameters.distance * Math.sin( phi ) * Math.cos( theta )
  
    uniforms.sunPosition.value = sun.position.copy( sun.position )
    uniforms.up.value.set( 0, 0, 1 )
  }, [])

  return (
    <>
      <ambientLight ref={props.sunRef} color={0x222222} />
      <sky ref={ref}>
        <boxGeometry args={[props.size, props.size, props.size]}/>
      </sky>
    </>
  )
}

Daytime.propTypes = {
  sunRef: PropTypes.any.isRequired,
  size: PropTypes.number.isRequired
}

export {Daytime}
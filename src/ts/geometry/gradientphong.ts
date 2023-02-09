import { extend, MaterialNode } from '@react-three/fiber'
import * as THREE from 'three'

class GradientPhongMaterial extends THREE.MeshPhongMaterial {

	constructor(color1: string, color2: string, opacity: number){
    super()
    this.defines = {USE_UV: ''}
    this.onBeforeCompile = shader=>{
      shader.uniforms.color1 = {value: new THREE.Color(color1)}
      shader.uniforms.color2 = {value: new THREE.Color(color2)}
      shader.uniforms.opacity = {value: opacity}
      shader.fragmentShader = `
      uniform vec3 color1;
      uniform vec3 color2;
      ${shader.fragmentShader.replace(
        "vec4 diffuseColor = vec4( diffuse, opacity )",
        "vec4 diffuseColor = vec4(mix(color2, color1, vUv.y), opacity)"
      )}
      `
    }
  }
}

// Extend so the reconciler will learn about it
extend({ GradientPhongMaterial })

// Add types to IntrinsicElements elements so primitives pick up on it
declare global {
  namespace JSX {
    interface IntrinsicElements {
      gradientPhongMaterial: MaterialNode<GradientPhongMaterial, typeof GradientPhongMaterial>
    }
  }
}

export {GradientPhongMaterial}
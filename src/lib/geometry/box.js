import * as THREE from 'three'

function createBoxWithRoundedEdges( width, height, depth, radius0, smoothness ) {
  // Pinched from here: https://discourse.threejs.org/t/round-edged-box/1402
  const shape = new THREE.Shape()
  const eps = 0.00001
  const radius = radius0 - eps
  shape.absarc( eps, eps, eps, -Math.PI / 2, -Math.PI, true )
  shape.absarc( eps, height -  radius * 2, eps, Math.PI, Math.PI / 2, true )
  shape.absarc( width - radius * 2, height -  radius * 2, eps, Math.PI / 2, 0, true )
  shape.absarc( width - radius * 2, eps, eps, 0, -Math.PI / 2, true )
  const geometry = new THREE.ExtrudeGeometry( shape, {
    amount: depth - radius0 * 2,
    bevelEnabled: true,
    bevelSegments: smoothness,
    steps: 1,
    bevelSize: radius,
    bevelThickness: radius0,
    curveSegments: smoothness
  })
  
  geometry.center()
  
  return geometry
}

export {createBoxWithRoundedEdges}
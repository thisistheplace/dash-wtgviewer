import * as THREE from 'three'

function nodeDistance(node1, node2){
  const dx = node2.x - node1.x
  const dy = node2.y - node1.y
  const dz = node2.z - node1.z

  return Math.sqrt(dx**2 + dy**2 + dz**2)
}

function nodeVector(node1, node2){
  return new THREE.Vector3(
    node2.x - node1.x,
    node2.y - node1.y,
    node2.z - node1.z
  )
}

export {nodeDistance, nodeVector}
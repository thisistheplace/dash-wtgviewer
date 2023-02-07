import * as THREE from 'three'

// Assumes each named object is a group with children meshes (not nested groups)
const findModelParts = (model, name) => {
  var geometries = []
  model.children.map(meshOrGroup => {
    if (meshOrGroup.name === name){
      meshOrGroup.children.map(mesh => {
        var geom = mesh.geometry.clone()
        geom.scale(mesh.scale.x, mesh.scale.y, mesh.scale.z)
        geom.applyQuaternion(mesh.quaternion)
        geom.translate(mesh.position.x, mesh.position.y, mesh.position.z)
        // geom.applyQuaternion(meshOrGroup.quaternion)
        // geom.translate(meshOrGroup.position.x, meshOrGroup.position.y, meshOrGroup.position.z)
        geometries.push(geom)
      })
    } else if (meshOrGroup.children.length > 0){
      meshOrGroup.children.map(mesh => {
        if ("isGroup" in mesh){
          geometries.push(...findModelParts(meshOrGroup, name))
        }
      })
    }
  })
  return geometries
}

const setInstanceArray = (ref, positions, exclude, trans=new THREE.Vector3(0, 0, 0)) => {
  const temp = new THREE.Object3D()
  var j = 0
  var indexOffset = 0
  for (let i = 0; i < positions.length; i++) {
    if (i === exclude){
      indexOffset = -1
      continue
    }
    j = i + indexOffset
    const point = positions[i]
    temp.position.set(point.x + trans.x, point.y + trans.y, 0 + trans.z)
    temp.updateMatrix()
    ref.current.setMatrixAt(j, temp.matrix)
  }
  ref.current.instanceMatrix.needsUpdate = true
}

export {findModelParts, setInstanceArray}
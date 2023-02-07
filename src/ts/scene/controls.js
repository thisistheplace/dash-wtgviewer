import {useMemo, useEffect, useState} from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import * as THREE from 'three'
import CameraControls from 'camera-controls'

CameraControls.install({THREE: THREE})

const MAX_CAMERA_DISTANCE = 500
const ZOOM_TO_DISTANCE = 300

function Controls({ focusHeight = 0, zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const [zooming, setZooming] = useState(false)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  controls.maxDistance = MAX_CAMERA_DISTANCE

  useEffect(()=>{
    setZooming(true)
  }, [focus])

  return useFrame((state, delta) => {
    if (zooming){
      zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(250, 250, focusHeight)
      zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, focusHeight)

      state.camera.position.lerp(pos, 0.5)
      state.camera.updateProjectionMatrix()

      controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)

      if (state.camera.position.distanceTo(focus) < ZOOM_TO_DISTANCE){setZooming(false)}
    }
    return controls.update(delta)
  })
}

export {Controls}
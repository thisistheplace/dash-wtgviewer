import React, {useRef} from 'react'

const Lights = () => {
  const ref = useRef()
  const pointOffset = -10000
  const lightIntensity = 0.6

  return (
    <group ref={ref}>
      <ambientLight intensity={lightIntensity}/>
      <directionalLight args={['white', lightIntensity]}/>
      <pointLight position={[pointOffset, pointOffset, 0]}/>
    </group>
  )
}

export {Lights}
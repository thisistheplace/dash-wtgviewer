import React, {useRef} from 'react'

const Lights = () => {
  const ref = useRef()
  const pointOffset = -10000

  return (
    <group ref={ref}>
      <ambientLight intensity={0.6}/>
      <directionalLight args={['white', 0.6]}/>
      <pointLight position={[pointOffset, pointOffset, 0]}/>
    </group>
  )
}

export {Lights}
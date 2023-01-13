import React, {useRef} from 'react'

const Lights = () => {
  const ref = useRef()

  return (
    <group ref={ref}>
      <ambientLight intensity={0.6}/>
      <directionalLight args={['white', 1]}/>
    </group>
  )
}

export {Lights}
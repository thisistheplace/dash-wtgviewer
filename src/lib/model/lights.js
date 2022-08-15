import React, {useRef, useEffect} from 'react';

function SpotLight(props){
    const light = useRef()
    useEffect(() => {
      light.current.lookAt(0, 0, 0)   
    }, []);
    return <spotLight ref={light} color={props.color} position={props.position} intensity={props.intensity} distance={props.distance} />
  };

export {SpotLight};
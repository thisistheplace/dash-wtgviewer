import * as FarmPropTypes from './../proptypes/farm'

import React, { Suspense, useState, useEffect, useRef, createRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'

import * as THREE from 'three'

import {Controls} from '../scene/controls'
import { Lights } from '../scene/lights'
import { Environment } from '../scene/environment/env'
import { Map } from './map/map'
import Model from '../model/model'
import TurbineArray from './array'

const Farm = (props) => {
    const {setParentProps} = props
    const ref = useRef()
    const modelRef = createRef()
    // Tooltip data
    const [tooltipData, setTooltipData] = useState({display: 'none', text: ""})
    const [tooltipContents] = useState(null)
    const [mousePos, setMousePos] = useState({})
    // Holds map overlay visibility
    const [mapVisible, setMapVisible] = useState(props.show_map)
    // Holds turbine array xy coordinates
    const [turbinexy, setTurbinexy] = useState([])
    // Holds selected turbine position and matrix data
    // idx is index in turbinexy array
    const [currentTurbine, setCurrentTurbine] = useState(0)
    const [modelPosition, setModelPosition] = useState(new THREE.Vector3(0, 0, 0))
    // Tooltip style to react to props
    const tooltipStyle = {
        display: props.tooltip ? tooltipData.display : 'none',
        left: mousePos.x + 'px',
        top: mousePos.y + 'px',
    }

    // Camera manipulation
    const [zoom, setZoom] = useState(false)

    useEffect(()=>{
        if (turbinexy.length < 1){return}
        setZoom(!zoom)
        setModelPosition(new THREE.Vector3(
            turbinexy[currentTurbine].x,
            turbinexy[currentTurbine].y,
            0
        ))
    }, [currentTurbine])

    useEffect(()=>{
        setParentProps({
            show_map: mapVisible
        })
    }, [mapVisible])

    useEffect(()=>{
      if (!ref.current){return}
      setMapVisible(props.show_map)
    }, [props.show_map])

    useEffect(() => {
        const handleMouseMove = (event) => {
          setMousePos({ x: event.clientX, y: event.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => {
          window.removeEventListener(
            'mousemove',
            handleMouseMove
          )
        }
    }, [])

    return (
        <div ref={ref} style={{"height":"100%", "width":"100%"}}>
            <div className="modelTooltip" style={tooltipStyle}>
                {tooltipData.text}
                <br />
                {tooltipContents}
            </div>
            <div id={props.id} className={!mapVisible?"fadeIn":"fadeOut"}>
                <Canvas style={{'background':'white'}} camera={{position: [100, 100, 100], up: [0, 0, 1], fov:50, aspect:window.innerWidth / window.innerHeight, near: 0.1, far: 5000}}>
                    <Controls zoom={zoom} focus={modelPosition}/>
                    {/* <axesHelper scale={100}/> */}
                    <Lights {...props}/>
                    <Environment visible={props.sea}/>
                    <Suspense fallback={null}>
                        <Model ref={modelRef} {...props.model} position={modelPosition} callbacks={{tooltip: setTooltipData}}/>
                        <TurbineArray ref={modelRef} positions={turbinexy} currentTurbine={currentTurbine}/>
                    </Suspense>
                </Canvas>
                <Loader />
            </div>
            <Map {...props.map} callbacks={{setMapVisible: setMapVisible, setTurbinexy: setTurbinexy, setCurrentTurbine: setCurrentTurbine}} className={!mapVisible?"fadeIn":"fadeOut"}/>
        </div>
    )
}

Farm.defaultProps = {
    tooltip: true,
    sea: true,
    show_map: false
}

Farm.propTypes = FarmPropTypes.Farm

export { Farm }
import * as FarmPropTypes from './../proptypes/farm'

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'

import * as THREE from 'three'

import {Tooltip} from './ui'
import {Controls} from '../scene/controls'
import { Lights } from '../scene/lights'
import { Environment } from '../scene/environment/env'
import { Map } from './map/map'
import TurbineArray from './array'

const FOCUS_HEIGHT = 15

const Farm = (props) => {
    const {setParentProps} = props
    const ref = useRef()
    // Tooltip data
    const [tooltipStyle, setTooltipStyle] = useState({display: 'none', text: ""})
    const [tooltipContents] = useState(null)
    // Holds map overlay visibility
    const [mapVisible, setMapVisible] = useState(props.show_map)
    // Holds turbine array xy coordinates
    const [turbinexy, setTurbinexy] = useState([])
    // Holds selected turbine position and matrix data
    // idx is index in turbinexy array
    const [currentTurbine, setCurrentTurbine] = useState(0)
    const [modelPosition, setModelPosition] = useState(new THREE.Vector3(0, 0, 0))

    // Camera manipulation
    const [zoom, setZoom] = useState(false)
    const [focus, setFocus] = useState(new THREE.Vector3(0, 0, 0))

    useEffect(()=>{
        if (turbinexy.length < 1){return}
        setZoom(!zoom)
        setModelPosition(new THREE.Vector3(
            turbinexy[currentTurbine].x,
            turbinexy[currentTurbine].y,
            0
        ))
        setFocus(new THREE.Vector3(
            turbinexy[currentTurbine].x,
            turbinexy[currentTurbine].y,
            FOCUS_HEIGHT
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

    return (
        <div ref={ref} style={{"height":"100%", "width":"100%"}}>
            <Tooltip show={props.tooltip} tooltipStyle={tooltipStyle} tooltipContents={tooltipContents}/>
            <div id={props.id} className={!mapVisible?"fadeIn":"fadeOut"}>
                <Canvas style={{'background':'white'}} camera={{position: [100, 100, 100], up: [0, 0, 1], fov:50, aspect:window.innerWidth / window.innerHeight, near: 0.1, far: 5000}}>
                    <Controls zoom={zoom} focus={focus}/>
                    {/* <axesHelper scale={100}/> */}
                    <Lights {...props}/>
                    <Environment visible={props.sea}/>
                    <Suspense fallback={null}>
                        <TurbineArray
                            positions={turbinexy}
                            currentTurbine={currentTurbine}
                            model={{position: modelPosition, callbacks: {tooltip: setTooltipStyle}, ...props.model}}
                        />
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
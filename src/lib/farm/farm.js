import * as FarmPropTypes from './../proptypes/farm'

import React, { Suspense, useState, useEffect, useRef, createRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'

import * as THREE from 'three'

import {CameraControls} from '../scene/controls'
import { Lights } from '../scene/lights'
import { Environment } from '../scene/environment/env'
import { Map } from './map/map'
import { Model } from '../model/model'
import { TurbineArray } from './array'

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
    const [currentTurbine, setCurrentTurbine] = useState({position: turbinexy, matrices: []})
    // Tooltip style to react to props
    const tooltipStyle = {
        display: props.tooltip ? tooltipData.display : 'none',
        left: mousePos.x + 'px',
        top: mousePos.y + 'px',
    }

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
                <Canvas style={{'background':'white'}} camera={{position: [100, 100, 100], fov:50, aspect:window.innerWidth / window.innerHeight, near: 0.1, far: 10000}}>
                    <CameraControls/>
                    {/* <axesHelper scale={100}/> */}
                    <Lights {...props}/>
                    <Environment visible={props.sea}/>
                    <Suspense fallback={null}>
                        <Model ref={modelRef} {...props.model} callbacks={{tooltip: setTooltipData}}/>
                        <TurbineArray modelRef={modelRef} positions={turbinexy}/>
                    </Suspense>
                </Canvas>
                <Loader />
            </div>
            <Map {...props.map} callbacks={{setMapVisible: setMapVisible, setTurbinexy: setTurbinexy}} className={!mapVisible?"fadeIn":"fadeOut"}/>
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
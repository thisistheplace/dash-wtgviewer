import * as FarmPropTypes from '../proptypes/farm'

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader, Stats } from '@react-three/drei'

import * as THREE from 'three'

import { Tooltip } from './tooltip'
import { Controls } from '../scene/controls'
import { Lights } from '../scene/lights'
import { Environment } from '../scene/environment/env'
import { Map } from './map/map'
import { TurbineModel } from './turbines'
import { ResultsColorScale } from '../results/colorscale'

const FOCUS_HEIGHT = 50
const MOBILE_SIZE = 1000
const ORIGIN = new THREE.Vector3(0, 0, 0)

type FarmProps = {
    setParentProps: Function
} & FarmPropTypes.Farm

const Farm = (props: FarmProps) => {
    const {setParentProps} = props
    const ref = useRef()
    // Tooltip data
    const [tooltipStyle, setTooltipStyle] = useState({display: 'none', text: ""})
    const [tooltipContents, setTooltipContents] = useState([])
    // Holds map overlay visibility
    const [mapVisible, setMapVisible] = useState(props.show_map)
    // Holds turbine array xy coordinates
    const [turbinexy, setTurbinexy] = useState([])
    // Holds selected turbine position and matrix data
    // idx is index in turbinexy array
    const [currentTurbine, setCurrentTurbine] = useState(0)
    const [modelPosition, setModelPosition] = useState(ORIGIN)
    // Colorscale
    const [colorscaleClicked, setColorscaleClicked] = useState(0)

    // Camera manipulation
    const [zoom, setZoom] = useState(false)
    const [focus, setFocus] = useState(new THREE.Vector3(0, 0, 0))
    const [focusHeight] = useState(FOCUS_HEIGHT)

    useEffect(()=>{
        if (turbinexy.length < 1){return}
        setZoom(true)
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
        setParentProps({
            colorscale_clicked: colorscaleClicked
        })
    }, [colorscaleClicked])

    useEffect(()=>{
        if (!ref.current){return}
        setMapVisible(props.show_map)
    }, [props.show_map])

    return (
        <div ref={ref} style={{"height":"100%", "width":"100%"}}>
            <Tooltip show={props.tooltip} tooltipStyle={tooltipStyle} tooltipContents={tooltipContents}/>
            <ResultsColorScale
                results={props.colorscale.visible ? props.results : null}
                limits={props.colorscale.limits}
                clicked={setColorscaleClicked}
            />
            <div style={{"height":"100%", "width":"100%", "display": mapVisible ? "none" : "block"}}>
                {/* Only select the closest item while raycasting */}
                <Canvas raycaster={{ filter: items => items.slice(0, 1) }} style={{'background':'white'}} camera={{position: [100, 100, 100], up: [0, 0, 1], fov:50, aspect:window.innerWidth / window.innerHeight, near: 0.1, far: 10000}}>
                    <Controls zoom={zoom} focus={focus} focusHeight={focusHeight}/>
                    {/* <axesHelper scale={100}/> */}
                    <Lights/>
                    {props.environment ? <Environment/> : null }
                    <Suspense fallback={null}>
                        <TurbineModel
                            array={props.environment && window.innerWidth > MOBILE_SIZE && window.innerHeight < MOBILE_SIZE}
                            positions={turbinexy}
                            currentTurbine={currentTurbine}
                            model={{
                                position: modelPosition,
                                results: {
                                    ...props.results,
                                    limits: props.colorscale.limits
                                },
                                callbacks: {tooltipStyle: setTooltipStyle, tooltipContents: setTooltipContents}, ...props.model
                            }}
                        />
                    </Suspense>
                    {props.stats ? <Stats className='stats'/> : null}
                </Canvas>
                <Loader />
            </div>
            {mapVisible ?
                // The map calculates the turbine positions
                <Map
                    {...props.map}
                    style={{height:"100%", width:"100%", zIndex: 20}}
                    callbacks={{setMapVisible: setMapVisible, setTurbinexy: setTurbinexy, setCurrentTurbine: setCurrentTurbine}}
                />
                : null
            }
        </div>
    )
}

Farm.defaultProps = {
    tooltip: true,
    environment: true,
    show_map: false,
    colorscale: {
        visible: true,
        limits: null
    },
    colorscale_clicked: false,
    stats: false
}

export { Farm }
import * as FarmPropTypes from './../proptypes/farm'

import React, { Suspense, useState, useEffect, useRef, createRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'

import {CameraControls} from '../scene/controls'
import { Lights } from '../scene/lights'
import { Environment } from '../scene/environment/env'
import { Map } from './map/map'
import { Model } from '../model/model'
import { TurbineArray } from './array'

const Farm = (props) => {
    const ref = useRef()
    const modelRef = createRef()
    const [tooltipData, setTooltipData] = useState({display: 'none', text: ""})
    // const [value] = useState(null)
    const [mousePos, setMousePos] = useState({})
    const [mapVisible, setMapVisible] = useState(props.show_map)

    useEffect(()=>{
      if (!ref.current){return}
      setMapVisible(props.show_map)
    }, [props.map])

    // useEffect(() => {
    //     const handleMouseMove = (event) => {
    //       setMousePos({ x: event.clientX, y: event.clientY })
    //     }
    //     window.addEventListener('mousemove', handleMouseMove)
    //     return () => {
    //       window.removeEventListener(
    //         'mousemove',
    //         handleMouseMove
    //       )
    //     }
    //   }, [])

    return (
        <div ref={ref} style={{"height":"100%", "width":"100%"}}>
            {/* <div className="cmpt_tooltip">
                {tooltipData.text}
                <br />
                {value}
            </div> */}
            <div id={props.id} className={!mapVisible?"fadeIn":"fadeOut"}>
                <Canvas style={{'background':'white'}} camera={{position: [100, 100, 100], fov:50, aspect:window.innerWidth / window.innerHeight, near: 0.1, far: 10000}}>
                    <CameraControls/>
                    {/* <axesHelper scale={100}/> */}
                    <Lights {...props}/>
                    <Environment visible={props.sea}/>
                    <Suspense fallback={null}>
                        <Model ref={modelRef} {...props.model} callbacks={{tooltip: setTooltipData}}/>
                        {/* <TurbineArray modelRef={modelRef} latlng={props.latlng}/> */}
                    </Suspense>
                </Canvas>
                <Loader />
            </div>
            <Map {...props.map} callbacks={{setMapVisible: setMapVisible}}/>
            <style jsx>{`
                .cmpt_tooltip {
                    color: white
                    background: rgba(0, 0, 0, 0.8)
                    border-radius: 20px
                    position: absolute
                    font-family: Verdana
                    z-index: 2
                    text-align: right
                    padding: 20px
                    display: ${props.tooltip ? tooltipData.display : 'none'}
                    left: ${mousePos.x}px
                    top: ${mousePos.y}px
                }
            `}</style>
        </div>
    )
}

Farm.defaultProps = {
    tooltip: false,
    sea: true,
    show_map: false
}

Farm.propTypes = FarmPropTypes.Farm

export { Farm }
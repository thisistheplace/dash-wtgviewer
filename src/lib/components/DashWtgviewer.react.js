import PropTypes from 'prop-types'

import * as ModelPropTypes from './../proptypes/model'

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'

import {CameraControls} from '../scene/controls'
import { Lights } from '../scene/lights'
import { Model } from '../model/model'

function DashWtgviewer(props) {
    const ref = useRef()
    const [tooltipData, setTooltipData] = useState({display: 'none', text: ""})
    const [value] = useState(null)
    const [mousePos, setMousePos] = useState({})

    useEffect(() => {
        const handleMouseMove = (event) => {
          setMousePos({ x: event.clientX, y: event.clientY });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          window.removeEventListener(
            'mousemove',
            handleMouseMove
          );
        };
      }, []);

    return (
        <div ref={ref}>
            <div className="cmpt_tooltip">
                {tooltipData.text}
                <br />
                {value}
            </div>
            <div id={props.id} style={{"height":"100%", "width":"100%"}}>
                <Canvas style={{'background':'white'}} camera={{position: [100, 100, 100], fov:50, aspect:window.innerWidth / window.innerHeight, near: 0.1, far: 10000}}>
                    <CameraControls/>
                    <axesHelper scale={100}/>
                    <Lights {...props}/>
                    <Suspense fallback={null}>
                        <Model {...props.model} callbacks={{tooltip: setTooltipData}}/>
                    </Suspense>
                </Canvas>
                <Loader />
            </div>
            <style jsx>{`
                .cmpt_tooltip {
                    color: white;
                    background: rgba(0, 0, 0, 0.8);
                    border-radius: 20px;
                    position: absolute;
                    font-family: Verdana;
                    z-index: 2;
                    text-align: right;
                    padding: 20px;
                    display: ${tooltipData.display};
                    left: ${mousePos.x}px;
                    top: ${mousePos.y}px;
                }
            `}</style>
        </div>
    )
}

DashWtgviewer.defaultProps = {
}

DashWtgviewer.propTypes = {
    // Converted from /assets/schema.json using https://transform.tools/json-to-proptypes
    id: PropTypes.string.isRequired,
    model: ModelPropTypes.Model.isRequired
}

export default DashWtgviewer
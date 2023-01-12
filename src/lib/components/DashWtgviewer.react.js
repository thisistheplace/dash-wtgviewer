import PropTypes from 'prop-types';

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {Loader, OrbitControls} from '@react-three/drei'

import { Lights } from '../model/lights'

const Model = (props) => {
    return (
        <>
            <Lights {...props}/>
        </>
    )
}

function DashWtgviewer(props) {
    return (
        <div id={props.id} style={{"height":"100%", "width":"100%"}}>
            <Canvas style={{'background':'white'}} camera={{position: [100, 100, 100], fov:50, aspect:window.innerWidth / window.innerHeight, near: 0.1, far: 1000}}>
                <OrbitControls maxPolarAngle={Math.PI / 2}/>
                <axesHelper scale={100}/>
                <Suspense fallback={null}>
                    <Model {...props}/>
                </Suspense>
            </Canvas>
            <Loader />
        </div>
    )
}

DashWtgviewer.defaultProps = {
    // model: {}
};

DashWtgviewer.propTypes = {
    id: PropTypes.string.isRequired,
    model: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.string,
        foundation: PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            node_sets: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                id: PropTypes.string,
                nodes: PropTypes.arrayOf(PropTypes.number)
            })
            ),
            element_sets: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                id: PropTypes.string,
                elements: PropTypes.arrayOf(PropTypes.number)
            })
            )
        }),
        tower: PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            node_sets: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                id: PropTypes.string,
                nodes: PropTypes.arrayOf(PropTypes.number)
            })
            ),
            element_sets: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                id: PropTypes.string,
                elements: PropTypes.arrayOf(PropTypes.number)
            })
            )
        }),
        nacelle: PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            element_sets: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                id: PropTypes.string,
                elements: PropTypes.arrayOf(PropTypes.number)
            })
            )
        }),
        hub: PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            cone: PropTypes.shape({
            id: PropTypes.number,
            eltype: PropTypes.string,
            nodes: PropTypes.arrayOf(PropTypes.number),
            diameter: PropTypes.number
            })
        }),
        blades: PropTypes.arrayOf(
            PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            url: PropTypes.string,
            node: PropTypes.number
            })
        )
    })
};

export default DashWtgviewer;
import PropTypes from 'prop-types'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {Loader} from '@react-three/drei'

import { Lights } from '../model/lights'
import {CameraControls} from '../model/controls'

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
                <CameraControls/>
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
}

DashWtgviewer.propTypes = {
    // Converted from /assets/schema.json using https://transform.tools/json-to-proptypes
    id: PropTypes.string.isRequired,
    model: PropTypes.shape(
    {
        name: PropTypes.string,
        id: PropTypes.string,
        foundation: PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            node_sets: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                id: PropTypes.string,
                nodes: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    x: PropTypes.number,
                    y: PropTypes.number,
                    z: -PropTypes.number
                })
                )
            })
            ),
            element_sets: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                id: PropTypes.string,
                elements: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    eltype: PropTypes.string,
                    nodes: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number,
                        x: PropTypes.number,
                        y: PropTypes.number,
                        z: -PropTypes.number
                    })
                    ),
                    diameter: PropTypes.number,
                    thickness: PropTypes.number
                })
                )
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
                nodes: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    x: PropTypes.number,
                    y: PropTypes.number,
                    z: PropTypes.number
                })
                )
            })
            ),
            element_sets: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                id: PropTypes.string,
                elements: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    eltype: PropTypes.string,
                    nodes: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number,
                        x: PropTypes.number,
                        y: PropTypes.number,
                        z: PropTypes.number
                    })
                    ),
                    diameters: PropTypes.arrayOf(PropTypes.number),
                    thicknesses: PropTypes.arrayOf(PropTypes.number)
                })
                )
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
                elements: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    eltype: PropTypes.string,
                    nodes: PropTypes.arrayOf(
                    PropTypes.shape({
                        id: PropTypes.number,
                        x: PropTypes.number,
                        y: PropTypes.number,
                        z: PropTypes.number
                    })
                    ),
                    width: PropTypes.number,
                    height: PropTypes.number
                })
                )
            })
            )
        }),
        hub: PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            cone: PropTypes.shape({
            id: PropTypes.number,
            eltype: PropTypes.string,
            nodes: PropTypes.arrayOf(
                PropTypes.shape({
                id: PropTypes.number,
                x: -PropTypes.number,
                y: PropTypes.number,
                z: PropTypes.number
                })
            ),
            diameter: PropTypes.number
            })
        }),
        blades: PropTypes.arrayOf(
            PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            url: PropTypes.string,
            node: PropTypes.shape({
                id: PropTypes.number,
                x: PropTypes.number,
                y: PropTypes.number,
                z: PropTypes.number
            })
            })
        )
    })
}

export default DashWtgviewer
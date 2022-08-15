import React, {Component, useEffect} from 'react';
import {Canvas} from '@react-three/fiber';
import PropTypes from 'prop-types';
import {CameraControls} from './../model/controls.js';
import {SpotLight} from './../model/lights.js';
import ModelBuilder from './../model/model.js';
import {color_limits} from './../model/contours.js';
import HandleExport from './../utils/exporter';
// import {ContextBridge, ResultsContext} from './../model/context_management.js';

const getWindowRatio = () => {
    const { innerWidth: width, innerHeight: height } = window;
    const ratio = width / height
    return ratio
  };

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class DashWtgViewer extends Component {

    static defaultProps = {
        opacity: "1",
    }

    // build the model once!
    constructor(props){
        super(props);
        this.state = {
            model: ModelBuilder(this, props.members, props.nacelle, props.rotor_diameter, props.num_blades),
            tooltip: {display: 'none', text: ""},
            value: null,
            time: 0.0,
            play: false,
            contours: color_limits(),
            mouse: {x: 0.0, y: 0.0},
        }
    }


    render() {
        const {id} = this.props;

        return (
            <div id={id} className="threejs-block">
                <div className="cmpt_tooltip">
                    {this.state.tooltip.text}
                    <br />
                    {this.state.value}
                </div>
                <div className="canvas_holder">
                    <Canvas id="threejs_canvas">
                        <HandleExport export_obj={this.props.export_obj}/>
                        <axesHelper size={100} />
                        <ambientLight intensity={0.5} />
                        <SpotLight color={0xffffff} position={[1000, 1000, 1000]} intensity={1.3} distance={5000} />
                        <SpotLight color={0xffffff} position={[-1000, -1000, -1000]} intensity={1.3} distance={5000} />
                        <ambientLight color={0x222222} />
                        {/* <ContextBridge> */}
                        {this.state.model}
                        {/* </ContextBridge> */}
                        <perspectiveCamera makeDefault fov={75} aspect={getWindowRatio} near={0.1} far={1000}/>
                        <CameraControls />
                    </Canvas>
                </div>
                <style jsx>{`
                    .canvas_holder {
                        height: 1100px;
                        width: 100%;
                        background: white;
                        z-index: 1;
                    }
                    .cmpt_tooltip {
                        color: white;
                        background: rgba(0, 0, 0, 0.8);
                        border-radius: 20px;
                        position: absolute;
                        font-family: Verdana;
                        z-index: 2;
                        text-align: right;
                        padding: 20px;
                        display: ${this.state.tooltip.display};
                        left: ${this.state.mouse.x}px;
                        top: ${this.state.mouse.y}px;
                    }
                    .threejs-block {
                        width: 100%;
                        flex: 50%;
                        opacity: ${this.props.opacity};
                    }
                `}</style>
            </div>
        );
    }
}

DashWtgViewer.defaultProps = {};

DashWtgViewer.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string.isRequired,

    /**
     * Dash-assigned callback that should be called to report property changes
     * to Dash, to make them available for callbacks.
     */
    members: PropTypes.arrayOf(PropTypes.shape({
            number: PropTypes.number.isRequired,
            node1: PropTypes.arrayOf(PropTypes.number.isRequired),
            node2: PropTypes.arrayOf(PropTypes.number.isRequired),
            radius1: PropTypes.number.isRequired,
            radius2: PropTypes.number.isRequired,
            cmpt_type: PropTypes.string,
            cmpt_id: PropTypes.string,
            value: PropTypes.number,
        })).isRequired,

    values: PropTypes.object.isRequired,

    nacelle: PropTypes.arrayOf(PropTypes.shape({
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        length: PropTypes.number.isRequired,
        node: PropTypes.arrayOf(PropTypes.number.isRequired),
        direction: PropTypes.arrayOf(PropTypes.number.isRequired),
        cmpt_type: PropTypes.string,
        cmpt_id: PropTypes.string,
        value: PropTypes.number,
    })),

    rotor_diameter: PropTypes.number.isRequired,

    num_blades: PropTypes.number.isRequired,

    max: PropTypes.number.isRequired,

    min: PropTypes.number.isRequired,

    active_cmpt: PropTypes.number,

    opacity: PropTypes.string, 

    result: PropTypes.string,

    complete: PropTypes.string,

    export_obj: PropTypes.string,
};
import {useEffect} from 'react'
import {useThree} from '@react-three/fiber'
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter.js'

function exportToObj(scene) {
    const exporter = new OBJExporter();
    const obj_str = exporter.parse( scene );
    const file = new Blob([obj_str], {type: 'text/plain'})
    const element = document.createElement("a")
    element.href = URL.createObjectURL(file)
    element.download = "scene.obj"
    element.click()
}

export default function HandleExport(props) {
    const {scene} = useThree();
    useEffect(() => {
        if (props.export_obj == "export"){
            try {
                exportToObj(scene)
            } catch (error) {
                console.log(error);
                props.export_obj = "none"
            }
        }
    }, [props.export_obj]);
    return (null)
}

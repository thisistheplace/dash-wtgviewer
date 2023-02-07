import React, { createRef, useRef} from 'react'

import { Ocean } from './sea'
import { Daytime } from './daytime'

type EnvironmentProps = {
    visible: boolean,
    size: number
}

const Environment = (props: EnvironmentProps) => {
    const ref = useRef()
    const sunRef = createRef()
    return (
        <group ref={ref}  {...props}>
            <Daytime sunRef={sunRef} size={props.size}/>
            <Ocean sunRef={sunRef} size={props.size}/>
        </group>
    )
}

Environment.defaultProps = {
    size: 70000
}

export {Environment}
import PropTypes from 'prop-types'
import React, { createRef, useRef} from 'react'

import { Ocean } from './sea'
import { Daytime } from './daytime'

const Environment = (props) => {
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

Environment.propTypes = {
    visible: PropTypes.bool.isRequired,
    size: PropTypes.number
  }

export {Environment}
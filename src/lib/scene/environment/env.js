import PropTypes from 'prop-types'
import React, { createRef, useRef} from 'react'

import { Ocean } from './sea'
import { Daytime } from './daytime'

const Environment = (props) => {
    const ref = useRef()
    const sunRef = createRef()
    const size = 30000
    return (
        <group ref={ref}  {...props}>
            <Daytime sunRef={sunRef} size={size}/>
            <Ocean sunRef={sunRef} size={size}/>
        </group>
    )
}

Environment.propTypes = {
    visible: PropTypes.bool.isRequired
  }

export {Environment}
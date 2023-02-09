import {DashComponentProps} from '../props'

import * as FarmPropTypes from './../proptypes/farm'

import React, { useRef } from 'react'

import { Farm } from '../farm/farm'

type Props = FarmPropTypes.Farm & DashComponentProps;

function DashWtgviewer(props: Props) {
    const ref = useRef()

    return (
      <div ref={ref} style={{"height":"100%", "width":"100%"}}>
        <Farm {...props} setParentProps={props.setProps}/>
      </div>
    )
}

DashWtgviewer.defaultProps = {
    tooltip: true,
    environment: true,
    colorscale_clicked: false
}


export default DashWtgviewer
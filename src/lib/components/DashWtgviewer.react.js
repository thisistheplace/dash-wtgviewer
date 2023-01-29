import * as FarmPropTypes from './../proptypes/farm'

import React, { useRef } from 'react'

import { Farm } from '../farm/farm'

function DashWtgviewer(props) {
    const ref = useRef()

    return (
      <div ref={ref} style={{"height":"100%", "width":"100%"}}>
        <Farm {...props} setParentProps={props.setProps}/>
      </div>
    )
}

DashWtgviewer.propTypes = {
    // Converted from /assets/schema.json using https://transform.tools/json-to-proptypes
  ...FarmPropTypes.Farm
}

export default DashWtgviewer
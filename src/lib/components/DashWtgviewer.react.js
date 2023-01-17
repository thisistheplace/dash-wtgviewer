import PropTypes from 'prop-types'

import * as ModelPropTypes from './../proptypes/model'

import React, { useRef } from 'react'

import { Farm } from '../farm/farm'

function DashWtgviewer(props) {
    const ref = useRef()

    return (
      <div ref={ref} style={{"height":"100%", "width":"100%"}}>
        <Farm {...props}/>
      </div>
    )
}

DashWtgviewer.defaultProps = {
    tooltip: false,
    sea: true
}

DashWtgviewer.propTypes = {
    // Converted from /assets/schema.json using https://transform.tools/json-to-proptypes
    id: PropTypes.string.isRequired,
    model: ModelPropTypes.Model.isRequired,
    tooltip: PropTypes.bool,
    sea: PropTypes.bool,
}

export default DashWtgviewer
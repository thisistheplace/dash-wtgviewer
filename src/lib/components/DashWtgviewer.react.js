import PropTypes from 'prop-types'

import * as ModelPropTypes from './../proptypes/model'
import * as FarmPropTypes from './../proptypes/farm'
import * as ResultPropTypes from './../proptypes/results'

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

DashWtgviewer.defaultProps = {
    tooltip: true,
    environment: true
}

DashWtgviewer.propTypes = {
    // Converted from /assets/schema.json using https://transform.tools/json-to-proptypes
    id: PropTypes.string.isRequired,
    model: ModelPropTypes.Model.isRequired,
    results: ResultPropTypes.Results,
    tooltip: PropTypes.bool,
    environment: PropTypes.bool,
    map: FarmPropTypes.Map,
    show_map: PropTypes.bool,
    stats: PropTypes.bool
}

export default DashWtgviewer
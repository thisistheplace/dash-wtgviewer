import PropTypes from 'prop-types'

import * as ModelPropTypes from './../proptypes/model'
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
    environment: true,
    colorscale_clicked: false
}

DashWtgviewer.propTypes = {
    // Converted from /assets/schema.json using https://transform.tools/json-to-proptypes
    id: PropTypes.string.isRequired,
    model: ModelPropTypes.Model.isRequired,
    results: ResultPropTypes.Results,
    tooltip: PropTypes.bool,
    environment: PropTypes.bool,
    colorscale: PropTypes.shape({
      visible: PropTypes.bool,
      min: PropTypes.number,
      max: PropTypes.number
    }),
    colorscale_clicked: PropTypes.bool,
    map: Map,
    show_map: PropTypes.bool.isRequired,
    stats: PropTypes.bool
}

export default DashWtgviewer
import {DashComponentProps} from '../props'

import * as FarmPropTypes from './../proptypes/farm'
import * as ModelPropTypes from './../proptypes/model'
import * as ResultPropTypes from './../proptypes/results'

import React, { useRef } from 'react'

import { Farm } from '../farm/farm'

type Props = {
  // Converted from /assets/schema.json using https://transform.tools/json-to-proptypes
  model: ModelPropTypes.Model,
  results: ResultPropTypes.Results,
  tooltip: boolean,
  environment: boolean,
  colorscale: {
    visible: boolean,
    min: number,
    max: number
  },
  colorscale_clicked: boolean,
  map: FarmPropTypes.Map,
  show_map: boolean,
  stats: boolean
} & DashComponentProps;

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
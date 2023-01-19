import React, {useEffect, useState} from 'react'
import * as FarmPropTypes from './../../proptypes/farm'
import { Turbine } from './turbine'

const Turbines = (props) => {
  const [positions, setPositions] = useState([])

  useEffect(()=>{
    if (!props.positions) {return}
    setPositions(props.positions)
  }, [props])

  return (
    <>
      {
        positions.map((position, i) =>
          <Turbine key={i} {...position} callbacks={props.callbacks}/>
        )
      }
    </>
  )
}

Turbines.defaultProps = {
}

Turbines.propTypes = FarmPropTypes.Turbines

export {Turbines}
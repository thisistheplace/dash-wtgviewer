import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'

const Tooltip = (props) => {

  const [mousePos, setMousePos] = useState({})
  // Tooltip style to react to props
  const tooltipStyle = {
    display: props.show ? props.tooltipStyle.display : 'none',
    left: mousePos.x + 'px',
    top: mousePos.y + 'px',
  }

  useEffect(() => {
    // Only require state monitoring when 
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      )
    }
}, [])

  return (
    <div className="modelTooltip" style={tooltipStyle}>
        {props.tooltipStyle.text}
        <br />
        {props.tooltipContents}
    </div>
  )
}

Tooltip.propTypes = {
  tooltipStyle: PropTypes.shape({
    text: PropTypes.any,
    display: PropTypes.string
  }),
  tooltipContents: PropTypes.string,
  show: PropTypes.bool
}

export {Tooltip}
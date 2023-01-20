import React, { useState, useEffect } from 'react'

const Tooltip = (props) => {

  const [mousePos, setMousePos] = useState({})
  // Tooltip style to react to props
  const tooltipStyle = {
    display: props.show ? props.tooltipData.display : 'none',
    left: mousePos.x + 'px',
    top: mousePos.y + 'px',
  }

  useEffect(() => {
    // Only require state monitoring when 
    const handleMouseMove = (event) => {
      // if (props.tooltipData.display !== 'none'){
      setMousePos({ x: event.clientX, y: event.clientY })
      // }
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
        {props.tooltipData.text}
        <br />
        {props.tooltipContents}
    </div>
  )
}

export {Tooltip}
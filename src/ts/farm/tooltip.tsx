import React, { useState, useEffect } from 'react'

type TooltipProps = {
  tooltipStyle: {
    text: string,
    display: string
  },
  tooltipContents: string[],
  show: boolean
}

const Tooltip = (props: TooltipProps) => {

  const [mousePos, setMousePos] = useState({x: 0, y: 0})
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
        {
          props.tooltipContents.map((text, i) => {
            return (<span key={i}>{text}{props.tooltipContents.length > 1 ? <br/> : null}</span>)
          })
        }
    </div>
  )
}

export {Tooltip}
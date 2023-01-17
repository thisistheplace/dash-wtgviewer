import PropTypes from 'prop-types'

export const Node = PropTypes.shape({
  id: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number
})

export const Element = PropTypes.shape({
  id: PropTypes.number,
  eltype: PropTypes.string,
  nodes: PropTypes.arrayOf(
    Node
  ),
  diameter: PropTypes.number,
  diameters: PropTypes.arrayOf(
    PropTypes.number
  ),
  thickness: PropTypes.number,
  thicknesses: PropTypes.arrayOf(
    PropTypes.number
  ),
  width: PropTypes.number,
  height: PropTypes.number
})

export const ElementSet = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  elements: PropTypes.arrayOf(
    Element
  )
})

export const Foundation = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  element_set: ElementSet
})

export const Tower = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  element_set: ElementSet
})

export const Nacelle = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  element: Element
})

export const Blade = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  url: PropTypes.string,
  node: Node,
  scale: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  })
})

export const Hub = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  cone: PropTypes.shape({
    id: PropTypes.number,
    eltype: PropTypes.string,
    nodes: PropTypes.arrayOf(
      Node
    ),
    diameter: PropTypes.number
  })
})

export const Rotor = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  blades: PropTypes.arrayOf(
    Blade
  ),
  hub: Hub,
  node: Node
})

export const Model = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.string,
  foundation: Foundation,
  tower: Tower,
  nacelle: Nacelle,
  rotor: Rotor
})

export const Callbacks = PropTypes.shape({
  tooltip: PropTypes.func.isRequired
})


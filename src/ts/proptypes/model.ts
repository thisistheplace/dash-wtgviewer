import * as ResultPropTypes from './../proptypes/results'

export type Node = {
  id: number,
  x: number,
  y: number,
  z: number
}

export type Element = {
  id: number,
  eltype: string,
  nodes: Node[],
  diameter: number,
  diameters: number[],
  thickness: number,
  thicknesses: number[],
  width: number,
  height: number
}

export type ElementSet = {
  name: string,
  id: string,
  elements: Element[]
}

export type Foundation = {
  name: string,
  id: string,
  element_set: ElementSet
}

export type Tower = {
  name: string,
  id: string,
  element_set: ElementSet
}

export type Nacelle = {
  name: string,
  id: string,
  element: Element
}

export type Blade = {
  name: string,
  id: string,
  url: string,
  scale: {
    x: number,
    y: number,
    z: number
  },
  axis: {
    x: number,
    y: number,
    z: number
  },
  rotation: number
}

export type Hub = {
  name: string,
  id: string,
  cone: {
    id: number,
    eltype: string,
    nodes: Node[],
    diameter: number
  }
}

export type Rotor = {
  name: string,
  id: string,
  blades: Blade[],
  hub: Hub,
  node: Node
}

export type Callbacks = {
  tooltipStyle: Function,
  tooltipContents: Function
}

export type Model = {
  name: string,
  id: string,
  foundation: Foundation,
  tower: Tower,
  nacelle: Nacelle,
  rotor: Rotor,
  callbacks: Callbacks,
  position: number[],
  results: ResultPropTypes.Results
}
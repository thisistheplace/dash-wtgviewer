# AUTO GENERATED FILE - DO NOT EDIT

export dashwtgviewer

"""
    dashwtgviewer(;kwargs...)

A DashWtgviewer component.

Keyword arguments:
- `id` (String; required)
- `model` (required): . model has the following type: lists containing elements 'name', 'id', 'foundation', 'tower', 'nacelle', 'hub', 'blades'.
Those elements have the following types:
  - `name` (String; optional)
  - `id` (String; optional)
  - `foundation` (optional): . foundation has the following type: lists containing elements 'name', 'id', 'node_sets', 'element_sets'.
Those elements have the following types:
  - `name` (String; optional)
  - `id` (String; optional)
  - `node_sets` (optional): . node_sets has the following type: Array of lists containing elements 'name', 'id', 'nodes'.
Those elements have the following types:
  - `name` (String; optional)
  - `id` (String; optional)
  - `nodes` (optional): . nodes has the following type: Array of lists containing elements 'id', 'x', 'y', 'z'.
Those elements have the following types:
  - `id` (Real; optional)
  - `x` (Real; optional)
  - `y` (Real; optional)
  - `z` (Real; optional)ss
  - `element_sets` (optional): . element_sets has the following type: Array of lists containing elements 'name', 'id', 'elements'.
Those elements have the following types:
  - `name` (String; optional)
  - `id` (String; optional)
  - `elements` (optional): . elements has the following type: Array of lists containing elements 'id', 'eltype', 'nodes', 'diameter', 'thickness'.
Those elements have the following types:
  - `id` (Real; optional)
  - `eltype` (String; optional)
  - `nodes` (optional): . nodes has the following type: Array of lists containing elements 'id', 'x', 'y', 'z'.
Those elements have the following types:
  - `id` (Real; optional)
  - `x` (Real; optional)
  - `y` (Real; optional)
  - `z` (Real; optional)s
  - `diameter` (Real; optional)
  - `thickness` (Real; optional)ss
  - `tower` (optional): . tower has the following type: lists containing elements 'name', 'id', 'node_sets', 'element_sets'.
Those elements have the following types:
  - `name` (String; optional)
  - `id` (String; optional)
  - `node_sets` (optional): . node_sets has the following type: Array of lists containing elements 'name', 'id', 'nodes'.
Those elements have the following types:
  - `name` (String; optional)
  - `id` (String; optional)
  - `nodes` (optional): . nodes has the following type: Array of lists containing elements 'id', 'x', 'y', 'z'.
Those elements have the following types:
  - `id` (Real; optional)
  - `x` (Real; optional)
  - `y` (Real; optional)
  - `z` (Real; optional)ss
  - `element_sets` (optional): . element_sets has the following type: Array of lists containing elements 'name', 'id', 'elements'.
Those elements have the following types:
  - `name` (String; optional)
  - `id` (String; optional)
  - `elements` (optional): . elements has the following type: Array of lists containing elements 'id', 'eltype', 'nodes', 'diameters', 'thicknesses'.
Those elements have the following types:
  - `id` (Real; optional)
  - `eltype` (String; optional)
  - `nodes` (optional): . nodes has the following type: Array of lists containing elements 'id', 'x', 'y', 'z'.
Those elements have the following types:
  - `id` (Real; optional)
  - `x` (Real; optional)
  - `y` (Real; optional)
  - `z` (Real; optional)s
  - `diameters` (Array of Reals; optional)
  - `thicknesses` (Array of Reals; optional)ss
  - `nacelle` (optional): . nacelle has the following type: lists containing elements 'name', 'id', 'element_sets'.
Those elements have the following types:
  - `name` (String; optional)
  - `id` (String; optional)
  - `element_sets` (optional): . element_sets has the following type: Array of lists containing elements 'name', 'id', 'elements'.
Those elements have the following types:
  - `name` (String; optional)
  - `id` (String; optional)
  - `elements` (optional): . elements has the following type: Array of lists containing elements 'id', 'eltype', 'nodes', 'width', 'height'.
Those elements have the following types:
  - `id` (Real; optional)
  - `eltype` (String; optional)
  - `nodes` (optional): . nodes has the following type: Array of lists containing elements 'id', 'x', 'y', 'z'.
Those elements have the following types:
  - `id` (Real; optional)
  - `x` (Real; optional)
  - `y` (Real; optional)
  - `z` (Real; optional)s
  - `width` (Real; optional)
  - `height` (Real; optional)ss
  - `hub` (optional): . hub has the following type: lists containing elements 'name', 'id', 'cone'.
Those elements have the following types:
  - `name` (String; optional)
  - `id` (String; optional)
  - `cone` (optional): . cone has the following type: lists containing elements 'id', 'eltype', 'nodes', 'diameter'.
Those elements have the following types:
  - `id` (Real; optional)
  - `eltype` (String; optional)
  - `nodes` (optional): . nodes has the following type: Array of lists containing elements 'id', 'x', 'y', 'z'.
Those elements have the following types:
  - `id` (Real; optional)
  - `x` (Real; optional)
  - `y` (Real; optional)
  - `z` (Real; optional)s
  - `diameter` (Real; optional)
  - `blades` (optional): . blades has the following type: Array of lists containing elements 'name', 'id', 'url', 'node'.
Those elements have the following types:
  - `name` (String; optional)
  - `id` (String; optional)
  - `url` (String; optional)
  - `node` (optional): . node has the following type: lists containing elements 'id', 'x', 'y', 'z'.
Those elements have the following types:
  - `id` (Real; optional)
  - `x` (Real; optional)
  - `y` (Real; optional)
  - `z` (Real; optional)s
"""
function dashwtgviewer(; kwargs...)
        available_props = Symbol[:id, :model]
        wild_props = Symbol[]
        return Component("dashwtgviewer", "DashWtgviewer", "dash_wtgviewer", available_props, wild_props; kwargs...)
end


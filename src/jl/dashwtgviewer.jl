# AUTO GENERATED FILE - DO NOT EDIT

export dashwtgviewer

"""
    dashwtgviewer(;kwargs...)

A DashWtgviewer component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.
Keyword arguments:
- `id` (String; required): The ID used to identify this component in Dash callbacks.
- `active_cmpt` (Real; optional)
- `complete` (String; optional)
- `export_obj` (String; optional)
- `max` (Real; required)
- `members` (required): Dash-assigned callback that should be called to report property changes
to Dash, to make them available for callbacks.. members has the following type: Array of lists containing elements 'number', 'node1', 'node2', 'radius1', 'radius2', 'cmpt_type', 'cmpt_id', 'value'.
Those elements have the following types:
  - `number` (Real; required)
  - `node1` (Array of Reals; optional)
  - `node2` (Array of Reals; optional)
  - `radius1` (Real; required)
  - `radius2` (Real; required)
  - `cmpt_type` (String; optional)
  - `cmpt_id` (String; optional)
  - `value` (Real; optional)s
- `min` (Real; required)
- `nacelle` (optional): . nacelle has the following type: Array of lists containing elements 'height', 'width', 'length', 'node', 'direction', 'cmpt_type', 'cmpt_id', 'value'.
Those elements have the following types:
  - `height` (Real; required)
  - `width` (Real; required)
  - `length` (Real; required)
  - `node` (Array of Reals; optional)
  - `direction` (Array of Reals; optional)
  - `cmpt_type` (String; optional)
  - `cmpt_id` (String; optional)
  - `value` (Real; optional)s
- `num_blades` (Real; required)
- `opacity` (String; optional)
- `result` (String; optional)
- `rotor_diameter` (Real; required)
- `values` (Dict; required)
"""
function dashwtgviewer(; kwargs...)
        available_props = Symbol[:id, :active_cmpt, :complete, :export_obj, :max, :members, :min, :nacelle, :num_blades, :opacity, :result, :rotor_diameter, :values]
        wild_props = Symbol[]
        return Component("dashwtgviewer", "DashWtgviewer", "dash_wtgviewer", available_props, wild_props; kwargs...)
end


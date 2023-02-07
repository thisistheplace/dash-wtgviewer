# AUTO GENERATED FILE - DO NOT EDIT

export dashwtgviewer

"""
    dashwtgviewer(;kwargs...)

A DashWtgviewer component.

Keyword arguments:
- `id` (String; required)
- `colorscale` (optional): . colorscale has the following type: lists containing elements 'visible', 'min', 'max'.
Those elements have the following types:
  - `visible` (Bool; optional)
  - `min` (Real; optional)
  - `max` (Real; optional)
- `colorscale_clicked` (Bool; optional)
- `environment` (Bool; optional)
- `map` (optional)
- `model` (optional)
- `results` (optional)
- `show_map` (Bool; required)
- `stats` (Bool; optional)
- `tooltip` (Bool; optional)
"""
function dashwtgviewer(; kwargs...)
        available_props = Symbol[:id, :colorscale, :colorscale_clicked, :environment, :map, :model, :results, :show_map, :stats, :tooltip]
        wild_props = Symbol[]
        return Component("dashwtgviewer", "DashWtgviewer", "dash_wtgviewer", available_props, wild_props; kwargs...)
end


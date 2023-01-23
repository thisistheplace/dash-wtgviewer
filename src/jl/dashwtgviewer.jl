# AUTO GENERATED FILE - DO NOT EDIT

export dashwtgviewer

"""
    dashwtgviewer(;kwargs...)

A DashWtgviewer component.

Keyword arguments:
- `id` (String; required)
- `environment` (Bool; optional)
- `map` (optional)
- `model` (optional)
- `show_map` (Bool; optional)
- `tooltip` (Bool; optional)
"""
function dashwtgviewer(; kwargs...)
        available_props = Symbol[:id, :environment, :map, :model, :show_map, :tooltip]
        wild_props = Symbol[]
        return Component("dashwtgviewer", "DashWtgviewer", "dash_wtgviewer", available_props, wild_props; kwargs...)
end


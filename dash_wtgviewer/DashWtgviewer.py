# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashWtgviewer(Component):
    """A DashWtgviewer component.


Keyword arguments:

- id (string; required)

- colorscale (dict; optional)

    `colorscale` is a dict with keys:

    - max (number; optional)

    - min (number; optional)

    - visible (boolean; optional)

- colorscale_clicked (boolean; default False)

- environment (boolean; default True)

- map (optional)

- model (optional)

- results (optional)

- show_map (boolean; required)

- stats (boolean; optional)

- tooltip (boolean; default True)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_wtgviewer'
    _type = 'DashWtgviewer'
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, model=Component.UNDEFINED, results=Component.UNDEFINED, tooltip=Component.UNDEFINED, environment=Component.UNDEFINED, colorscale=Component.UNDEFINED, colorscale_clicked=Component.UNDEFINED, map=Component.UNDEFINED, show_map=Component.REQUIRED, stats=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'colorscale', 'colorscale_clicked', 'environment', 'map', 'model', 'results', 'show_map', 'stats', 'tooltip']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'colorscale', 'colorscale_clicked', 'environment', 'map', 'model', 'results', 'show_map', 'stats', 'tooltip']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['id', 'show_map']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(DashWtgviewer, self).__init__(**args)

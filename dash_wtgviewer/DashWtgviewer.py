# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashWtgviewer(Component):
    """A DashWtgviewer component.


Keyword arguments:

- id (string; required)

- model (optional)

- sea (boolean; default True)

- tooltip (boolean; default False)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_wtgviewer'
    _type = 'DashWtgviewer'
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, model=Component.UNDEFINED, tooltip=Component.UNDEFINED, sea=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'model', 'sea', 'tooltip']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'model', 'sea', 'tooltip']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        for k in ['id']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        super(DashWtgviewer, self).__init__(**args)

# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashWtgviewer(Component):
    """A DashWtgviewer component.
ExampleComponent is an example component.
It takes a property, `label`, and
displays it.
It renders an input with the property `value`
which is editable by the user.

Keyword arguments:

- id (string; required):
    The ID used to identify this component in Dash callbacks.

- active_cmpt (number; optional)

- complete (string; optional)

- export_obj (string; optional)

- max (number; required)

- members (list of dicts; required):
    Dash-assigned callback that should be called to report property
    changes to Dash, to make them available for callbacks.

    `members` is a list of dicts with keys:

    - cmpt_id (string; optional)

    - cmpt_type (string; optional)

    - node1 (list of numbers; optional)

    - node2 (list of numbers; optional)

    - number (number; required)

    - radius1 (number; required)

    - radius2 (number; required)

    - value (number; optional)

- min (number; required)

- nacelle (list of dicts; optional)

    `nacelle` is a list of dicts with keys:

    - cmpt_id (string; optional)

    - cmpt_type (string; optional)

    - direction (list of numbers; optional)

    - height (number; required)

    - length (number; required)

    - node (list of numbers; optional)

    - value (number; optional)

    - width (number; required)

- num_blades (number; required)

- opacity (string; default "1")

- result (string; optional)

- rotor_diameter (number; required)

- values (dict; required)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_wtgviewer'
    _type = 'DashWtgviewer'
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, members=Component.REQUIRED, values=Component.REQUIRED, nacelle=Component.UNDEFINED, rotor_diameter=Component.REQUIRED, num_blades=Component.REQUIRED, max=Component.REQUIRED, min=Component.REQUIRED, active_cmpt=Component.UNDEFINED, opacity=Component.UNDEFINED, result=Component.UNDEFINED, complete=Component.UNDEFINED, export_obj=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'active_cmpt', 'complete', 'export_obj', 'max', 'members', 'min', 'nacelle', 'num_blades', 'opacity', 'result', 'rotor_diameter', 'values']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'active_cmpt', 'complete', 'export_obj', 'max', 'members', 'min', 'nacelle', 'num_blades', 'opacity', 'result', 'rotor_diameter', 'values']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}
        for k in ['id', 'max', 'members', 'min', 'num_blades', 'rotor_diameter', 'values']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')
        super(DashWtgviewer, self).__init__(**args)

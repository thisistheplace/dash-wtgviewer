# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashWtgviewer(Component):
    """A DashWtgviewer component.


Keyword arguments:

- id (string; required)

- model (dict; optional)

    `model` is a dict with keys:

    - blades (list of dicts; optional)

        `blades` is a list of dicts with keys:

        - id (string; optional)

        - name (string; optional)

        - node (dict; optional)

            `node` is a dict with keys:

            - id (number; optional)

            - x (number; optional)

            - y (number; optional)

            - z (number; optional)

        - url (string; optional)

    - foundation (dict; optional)

        `foundation` is a dict with keys:

        - element_sets (list of dicts; optional)

            `element_sets` is a list of dicts with keys:

    - elements (list of dicts; optional)

        `elements` is a list of dicts with keys:

        - diameter (number; optional)

        - eltype (string; optional)

        - id (number; optional)

        - nodes (list of dicts; optional)

            `nodes` is a list of dicts with keys:

            - id (number; optional)

            - x (number; optional)

            - y (number; optional)

            - z (number; optional)

        - thickness (number; optional)

    - id (string; optional)

    - name (string; optional)

        - id (string; optional)

        - name (string; optional)

        - node_sets (list of dicts; optional)

            `node_sets` is a list of dicts with keys:

    - id (string; optional)

    - name (string; optional)

    - nodes (list of dicts; optional)

        `nodes` is a list of dicts with keys:

        - id (number; optional)

        - x (number; optional)

        - y (number; optional)

        - z (number; optional)

    - hub (dict; optional)

        `hub` is a dict with keys:

        - cone (dict; optional)

            `cone` is a dict with keys:

            - diameter (number; optional)

            - eltype (string; optional)

            - id (number; optional)

            - nodes (list of dicts; optional)

                `nodes` is a list of dicts with keys:

    - id (number; optional)

    - x (number; optional)

    - y (number; optional)

    - z (number; optional)

        - id (string; optional)

        - name (string; optional)

    - id (string; optional)

    - nacelle (dict; optional)

        `nacelle` is a dict with keys:

        - element_sets (list of dicts; optional)

            `element_sets` is a list of dicts with keys:

    - elements (list of dicts; optional)

        `elements` is a list of dicts with keys:

        - eltype (string; optional)

        - height (number; optional)

        - id (number; optional)

        - nodes (list of dicts; optional)

            `nodes` is a list of dicts with keys:

            - id (number; optional)

            - x (number; optional)

            - y (number; optional)

            - z (number; optional)

        - width (number; optional)

    - id (string; optional)

    - name (string; optional)

        - id (string; optional)

        - name (string; optional)

    - name (string; optional)

    - tower (dict; optional)

        `tower` is a dict with keys:

        - element_sets (list of dicts; optional)

            `element_sets` is a list of dicts with keys:

    - elements (list of dicts; optional)

        `elements` is a list of dicts with keys:

        - diameters (list of numbers; optional)

        - eltype (string; optional)

        - id (number; optional)

        - nodes (list of dicts; optional)

            `nodes` is a list of dicts with keys:

            - id (number; optional)

            - x (number; optional)

            - y (number; optional)

            - z (number; optional)

        - thicknesses (list of numbers; optional)

    - id (string; optional)

    - name (string; optional)

        - id (string; optional)

        - name (string; optional)

        - node_sets (list of dicts; optional)

            `node_sets` is a list of dicts with keys:

    - id (string; optional)

    - name (string; optional)

    - nodes (list of dicts; optional)

        `nodes` is a list of dicts with keys:

        - id (number; optional)

        - x (number; optional)

        - y (number; optional)

        - z (number; optional)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_wtgviewer'
    _type = 'DashWtgviewer'
    @_explicitize_args
    def __init__(self, id=Component.REQUIRED, model=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'model']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'model']
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

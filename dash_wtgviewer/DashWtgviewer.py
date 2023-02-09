# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashWtgviewer(Component):
    """A DashWtgviewer component.


Keyword arguments:

- id (string; optional):
    Unique ID to identify this component in Dash callbacks.

- colorscale (dict; optional):
    Makes colorscale visible and manually sets the results colorscale
    limits if provided.

    `colorscale` is a dict with keys:

    - limits (dict; required)

        `limits` is a dict with keys:

        - max (number; required)

        - min (number; required)

    - visible (boolean; required)

- colorscale_clicked (number; default False):
    Count of number of clicks on colorscale.

- environment (boolean; default True):
    Turbine array, sea and sky visible if set to True.

- map (dict; optional):
    JSON definition of map data. See pydantic model in
    dash_wtgviewer.Map.

    `map` is a dict with keys:

    - boundary (dict; required)

        `boundary` is a dict with keys:

        - positions (list of dicts; required)

            `positions` is a list of dicts with keys:

    - id (string; required)

    - lat (number; required)

    - lng (number; required)

    - callbacks (dict; optional)

        `callbacks` is a dict with keys:


    - center (dict; required)

        `center` is a dict with keys:

        - id (string; required)

        - lat (number; required)

        - lng (number; required)

    - style (dict; optional)

    - turbines (dict; optional)

        `turbines` is a dict with keys:

        - callbacks (dict; optional)

            `callbacks` is a dict with keys:


        - positions (list of dicts; required)

            `positions` is a list of dicts with keys:

    - callbacks (dict; optional)

        `callbacks` is a dict with keys:


    - position (dict; required)

        `position` is a dict with keys:

        - id (string; required)

        - lat (number; required)

        - lng (number; required)

- model (dict; optional):
    JSON definition of model. See pydantic model in
    dash_wtgviewer.Model.

    `model` is a dict with keys:

    - callbacks (dict; optional)

        `callbacks` is a dict with keys:

        - tooltipContents (required)

        - tooltipStyle (required)

    - foundation (dict; optional)

        `foundation` is a dict with keys:

        - element_set (dict; required)

            `element_set` is a dict with keys:

            - elements (list of a list of or a singular dash component, string or numbers; required)

            - id (string; required)

            - name (string; required)

        - id (string; required)

        - name (string; required)

    - id (string; required)

    - nacelle (dict; optional)

        `nacelle` is a dict with keys:

        - element (a list of or a singular dash component, string or number; required)

        - id (string; required)

        - name (string; required)

    - name (string; required)

    - position (dict; optional)

        `position` is a dict with keys:

        - add (required):
            Adds v to this vector.

        - addScalar (required)

        - addScaledVector (required)

        - addVectors (required):
            Sets this vector to a + b.

        - angleTo (required)

        - applyAxisAngle (required)

        - applyEuler (required)

        - applyMatrix3 (required)

        - applyMatrix4 (required)

        - applyNormalMatrix (required)

        - applyQuaternion (required)

        - ceil (required)

        - clamp (required)

        - clampLength (required)

        - clampScalar (required)

        - clone (required):
            Clones this vector.

        - copy (required):
            Copies value of v to this vector.

        - cross (required):
            Sets this vector to cross product of itself and v.

        - crossVectors (required):
            Sets this vector to cross product of a and b.

        - distanceTo (required):
            Computes distance of this vector to v.

        - distanceToManhattan (required)

        - distanceToSquared (required):
            Computes squared distance of this vector to v.

        - divide (required)

        - divideScalar (required):
            Divides this vector by scalar s. Set vector to ( 0, 0, 0 )
            if s == 0.

        - dot (required):
            Computes dot product of this vector and v.

        - equals (required):
            Checks for strict equality of this vector and v.

        - floor (required)

        - fromArray (required):
            Sets this vector's x, y and z value from the provided
            array or array-like. @,param,array, ,the source array or
            array-like. @,param,offset, ,(optional) offset into the
            array. Default is 0.

        - fromBufferAttribute (required)

        - getComponent (required)

        - isVector3 (dict; required)

            `isVector3` is a dict with keys:

            - valueOf (optional):
                Returns the primitive value of the specified object.

        - length (required):
            Computes length of this vector.

        - lengthManhattan (required):
            Computes Manhattan length of this vector.
            http://en.wikipedia.org/wiki/Taxicab_geometry
            @,deprecated,Use ,{@link ,Vector3#manhattanLength
            .manhattanLength(),}, instead.

        - lengthSq (required):
            Computes squared length of this vector.

        - lerp (required)

        - lerpVectors (required)

        - manhattanDistanceTo (required):
            Computes the Manhattan length (distance) from this vector
            to the given vector v  see  {@link
            http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia:
            Taxicab Geometry }.

        - manhattanLength (required):
            Computes the Manhattan length of this vector.  see  {@link
            http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia:
            Taxicab Geometry }.

        - max (required)

        - min (required)

        - multiply (required)

        - multiplyScalar (required):
            Multiplies this vector by scalar s.

        - multiplyVectors (required)

        - negate (required):
            Inverts this vector.

        - normalize (required):
            Normalizes this vector.

        - project (required)

        - projectOnPlane (required)

        - projectOnVector (required)

        - random (required):
            Sets this vector's x, y and z from Math.random.

        - randomDirection (required)

        - reflect (required)

        - round (required)

        - roundToZero (required)

        - set (required):
            Sets value of this vector.

        - setComponent (required)

        - setFromCylindrical (required)

        - setFromCylindricalCoords (required)

        - setFromEuler (required):
            Sets this vector's  {@link  x  } ,  {@link  y  }  and
            {@link  z  }  components from the x, y, and z components
            of the specified  {@link  Euler Euler Angle } .

        - setFromMatrix3Column (required)

        - setFromMatrixColumn (required)

        - setFromMatrixPosition (required)

        - setFromMatrixScale (required)

        - setFromSpherical (required)

        - setFromSphericalCoords (required)

        - setLength (required):
            Normalizes this vector and multiplies it by l.

        - setScalar (required):
            Sets all values of this vector.

        - setX (required):
            Sets x value of this vector.

        - setY (required):
            Sets y value of this vector.

        - setZ (required):
            Sets z value of this vector.

        - sub (required):
            Subtracts v from this vector.

        - subScalar (required)

        - subVectors (required):
            Sets this vector to a - b.

        - toArray (list; required):
            Returns an array [x, y, z], or copies x, y and z into the
            provided array.   Copies x, y and z into the provided
            array-like. @,param,array, ,(optional) array to store the
            vector to. If this is not provided, a new array will be
            created. @,param,offset, ,(optional) optional offset into
            the array. @,return,The created or provided array.
            @,param,array, ,array-like to store the vector to.
            @,param,offset, ,(optional) optional offset into the
            array-like. @,return,The provided array-like.

        - transformDirection (required)

        - unproject (required)

        - x (number; required)

        - y (number; required)

        - z (number; required)

    - results (dict; optional)

        `results` is a dict with keys:

        - element_results (list of dicts; required)

            `element_results` is a list of dicts with keys:

    - id (string; required)

    - results (list of dicts; required)

        `results` is a list of dicts with keys:

        - color (string; required)

        - value (number; required)

    - target (string; required)

        - id (string; required)

        - limits (dict; optional)

            `limits` is a dict with keys:

            - max (number; required)

            - min (number; required)

    - rotor (dict; optional)

        `rotor` is a dict with keys:

        - blades (list of dicts; required)

            `blades` is a list of dicts with keys:

    - axis (dict; required)

        `axis` is a dict with keys:

        - x (number; required)

        - y (number; required)

        - z (number; required)

    - id (string; required)

    - name (string; required)

    - rotation (number; required)

    - scale (dict; required)

        `scale` is a dict with keys:

        - x (number; required)

        - y (number; required)

        - z (number; required)

    - url (string; required)

        - hub (dict; required)

            `hub` is a dict with keys:

            - cone (dict; required)

                `cone` is a dict with keys:

                - diameter (number; required)

                - eltype (string; required)

                - id (number; required)

                - nodes (list of dicts; required)

                    `nodes` is a list of dicts with keys:

    - id (number; required)

    - x (number; required)

    - y (number; required)

    - z (number; required)

            - id (string; required)

            - name (string; required)

        - id (string; required)

        - name (string; required)

        - node (dict; required)

            `node` is a dict with keys:

            - id (number; required)

            - x (number; required)

            - y (number; required)

            - z (number; required)

    - tower (dict; optional)

        `tower` is a dict with keys:

        - element_set (dict; required)

            `element_set` is a dict with keys:

            - elements (list of a list of or a singular dash component, string or numbers; required)

            - id (string; required)

            - name (string; required)

        - id (string; required)

        - name (string; required)

- results (dict; optional):
    JSON definition of results. See pydantic model in
    dash_wtgviewer.Results.

    `results` is a dict with keys:

    - element_results (list of dicts; required)

        `element_results` is a list of dicts with keys:

        - id (string; required)

        - results (list of dicts; required)

            `results` is a list of dicts with keys:

            - color (string; required)

            - value (number; required)

        - target (string; required)

    - id (string; required)

    - limits (dict; optional)

        `limits` is a dict with keys:

        - max (number; required)

        - min (number; required)

- show_map (boolean; optional):
    Interactive map overlay visible if set to True.

- stats (boolean; optional):
    Threejs FPS stats visible if set to True.

- tooltip (boolean; default True):
    Tooltip visible on mouseover if set to True."""
    _children_props = ['model.foundation.element_set.elements', 'model.tower.element_set.elements', 'model.nacelle.element']
    _base_nodes = ['children']
    _namespace = 'dash_wtgviewer'
    _type = 'DashWtgviewer'
    @_explicitize_args
    def __init__(self, model=Component.UNDEFINED, results=Component.UNDEFINED, tooltip=Component.UNDEFINED, environment=Component.UNDEFINED, colorscale=Component.UNDEFINED, colorscale_clicked=Component.UNDEFINED, map=Component.UNDEFINED, show_map=Component.UNDEFINED, stats=Component.UNDEFINED, id=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'colorscale', 'colorscale_clicked', 'environment', 'map', 'model', 'results', 'show_map', 'stats', 'tooltip']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'colorscale', 'colorscale_clicked', 'environment', 'map', 'model', 'results', 'show_map', 'stats', 'tooltip']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(DashWtgviewer, self).__init__(**args)
